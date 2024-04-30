import path from 'path';

import { createServer, Server as HttpServer } from 'http';
import{ Server as SocketIOServer} from 'socket.io';

import express, { Application, Router } from 'express';
import mosca from 'mosca';
import mqtt, { MqttClient } from 'mqtt';
import cors from 'cors';
import compression from 'compression';
import { prisma } from '../data';

interface ServerOptions {
    portMqtt: number;
    portApi: number;
    publicPath: string;
    routes: Router;
}

export class Server {

    private readonly portMqtt: number;
    private readonly app: Application;
    private readonly portApi: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    private readonly server: HttpServer;
    private readonly webSocket: SocketIOServer;

    private readonly map: Map<string, string>;

    constructor(options: ServerOptions) {
        const { portMqtt, portApi, publicPath, routes } = options;
        this.portMqtt = portMqtt;
        this.app = express();
        this.portApi = portApi;
        this.publicPath = publicPath;
        this.routes = routes;

        this.server = createServer(this.app);
        this.webSocket = new SocketIOServer(this.server);

        this.map = new Map();
    }   

    public async start() {

        // Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        this.app.use( cors() );
        this.app.use( compression() );

        // Public folder
        this.app.use( express.static( this.publicPath) );

        // Routes
        this.app.use( this.routes );
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, `../../${this.publicPath}`, 'index.html'));
        });

        this.server.listen(this.portApi, () => {
            console.log(`Servidor escuchando en el puerto ${this.portApi}`);
        });

        this.socket();
        this.mqttConfig();
    }

    private async mqttConfig() {
        const broker = new mosca.Server({ port: this.portMqtt });
        broker.on('ready', () => {
            console.log(`Broker MQTT en puerto ${this.portMqtt}`);
            broker.on("clientConnected", (client: mosca.Client) => console.log("Cliente: " + client.id));
            broker.on("published", (packet, client) => {
                if(packet.topic === "loading") this.webSocket.emit("loading", packet.payload.toString());
            });

            broker.on("subscribed", (topic: string, client) => {
                if(topic === "state_foco") this.map.set(client.id, "foco");
                if(topic === "cerradura") this.map.set(client.id, "cerradura");
                if(topic === "clavija") this.map.set(client.id, "clavija");
            });

            broker.on("clientDisconnected", (client: mosca.Client) => {
                console.log("Disconected " + client.id);
                const dispositivo = this.map.get(client.id);
                if(dispositivo === "foco") {
                    this.map.delete("state_foco_on");
                    this.webSocket.emit("foco", false);
                }
                if(dispositivo === "cerradura") {
                    this.map.delete("cerradura_on");
                    this.webSocket.emit("cerradura", false);
                }
                if(dispositivo === "clavija") {
                    this.map.delete("clavija_on");
                    this.webSocket.emit("clavija", false);
                }
            })
            
        });
    }

    private async socket() {
        this.webSocket.on('connection', (socket) => {
            
            if(this.map.has("state_foco_on")) {
                this.webSocket.emit("foco", true);
            }

            if(this.map.has("clavija_on")) {
                this.webSocket.emit("clavija", true);
            }

            if(this.map.has("cerradura_on")) {
                this.webSocket.emit("cerradura", true);
            }

            socket.on("foco", (payload, callback) => {
                const pub = mqtt.connect('mqtt://localhost:8083');
                pub.on('connect', async(packet) => {
                    pub.publish('state_foco', process.argv[2]);
                    pub.end();
                    const foco = await prisma.dispositivo.findUnique({ where: { alias: "foco" } });
                    if(!foco) throw new Error("Foco no en base de datos");
                    
                    await Promise.all([
                        prisma.dispositivo.update({
                            where: { id: foco.id },
                            data: { estado: (foco.estado === "APAGADO") ? "ENCENDIDO" : "APAGADO" }
                        }),
                        
                        prisma.eventos.create({ data: {
                            fecha_hora: this.generarFechaActual(),
                            id_dispositvo: foco.id,
                            id_user: payload,
                            accion: foco.estado,
                        }}),
                    ]);
                })
            });


            socket.on("clavija", (payload, callback) => {
                const pub = mqtt.connect('mqtt://localhost:8083');
                pub.on('connect', async(packet) => {
                    pub.publish('clavija', "");
                    pub.end();
                    const clavija = await prisma.dispositivo.findUnique({ where: { alias: "clavija" } });
                    if(!clavija) throw new Error("Clavija no en base de datos");
                    await Promise.all([
                        prisma.dispositivo.update({
                            where: { id: clavija.id },
                            data: { estado: (clavija.estado === "APAGADO") ? "ENCENDIDO" : "APAGADO" }
                        }),
                        prisma.eventos.create({ data: {
                            fecha_hora: this.generarFechaActual(),
                            id_dispositvo: clavija.id,
                            id_user: payload,
                            accion: clavija.estado,
                        }}),
                    ]);
                })
            });


            socket.on("cerradura", (payload, callback) => {
                const pub = mqtt.connect('mqtt://localhost:8083');
                pub.on('connect', async(packet) => {
                    pub.publish('cerradura', process.argv[2]);
                    pub.end();
                    const cerradura = await prisma.dispositivo.findUnique({ where: { alias: "cerradura" } });
                    if(!cerradura) throw new Error("Clavija no en base de datos");

                    await Promise.all([
                        prisma.dispositivo.update({
                            where: { id: cerradura.id },
                            data: { estado: (cerradura.estado === "ABIERTA") ? "BLOQUEADA" : "ABIERTA" }
                        }),
                        prisma.eventos.create({ data: {
                            fecha_hora: this.generarFechaActual(),
                            id_dispositvo: cerradura.id,
                            id_user: payload,
                            accion: cerradura.estado,
                        }}),
                    ]);
                })
            });

        });
        const sub = mqtt.connect(`mqtt://localhost:${this.portMqtt}`);
        await sub.subscribeAsync("state_foco_on");
        await sub.subscribeAsync("cerradura_on");
        await sub.subscribeAsync("clavija_on");
        sub.on("message", async(topic, message) => {
            switch (topic) {
                case "state_foco_on":
                    await prisma.dispositivo.update({ where:{ alias: "foco" }, data: { estado: "ENCENDIDO" } });
                    this.map.set("state_foco_on", "ok");
                    this.webSocket.emit("foco", true);
                    break;
                case "cerradura_on":
                    await prisma.dispositivo.update({ where:{ alias: "cerradura" }, data: { estado: "BLOQUEADA" } });
                    this.map.set("cerradura_on", "ok");
                    this.webSocket.emit("cerradura", true);
                    break;
                case "clavija_on":
                    console.log(message.toString());
                    await prisma.dispositivo.update({ where:{ alias: "clavija" }, data: { estado: "ENCENDIDO" } });
                    this.map.set("clavija_on", "ok");
                    this.webSocket.emit("clavija", true);
                    break;
                default:
                    break;
            }
        });
    }

    private generarFechaActual() {
        const fechaActual = new Date();

        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const dia = fechaActual.getDate().toString().padStart(2, '0'); 
        const hora = fechaActual.getHours().toString().padStart(2, '0'); 
        const minuto = fechaActual.getMinutes().toString().padStart(2, '0'); 
        const segundo = fechaActual.getSeconds().toString().padStart(2, '0'); 

        return `${año}-${mes}-${dia}T${hora}:${minuto}:${segundo}.000Z`;
    }
}