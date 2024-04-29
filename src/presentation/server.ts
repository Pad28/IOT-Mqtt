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

    constructor(options: ServerOptions) {
        const { portMqtt, portApi, publicPath, routes } = options;
        this.portMqtt = portMqtt;
        this.app = express();
        this.portApi = portApi;
        this.publicPath = publicPath;
        this.routes = routes;

        this.server = createServer(this.app);
        this.webSocket = new SocketIOServer(this.server);
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

        this.mqttConfig();
        this.socket();
    }

    private async mqttConfig() {
        const broker = new mosca.Server({ port: this.portMqtt });
        broker.on('ready', () => {
            console.log(`Broker MQTT en puerto ${this.portMqtt}`);
        });
    }

    private async socket() {
        this.webSocket.on('connection', (socket) => {
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
                        }}),
                    ]);
                })
            });


            socket.on("clavija", (payload, callback) => {
                const pub = mqtt.connect('mqtt://localhost:8083');
                pub.on('connect', async(packet) => {
                    pub.publish('clavija', process.argv[2]);
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
                        }}),
                    ]);
                })
            });

        });
        const sub = mqtt.connect(`mqtt://localhost:${this.portMqtt}`);
        await sub.subscribeAsync("state_foco");
        await sub.subscribeAsync("cerradura");
        await sub.subscribeAsync("calvija");
        sub.on("message", (topic) => {
            if(topic === "state_foco") this.webSocket.emit("foco", true);
            if(topic === "cerradura") this.webSocket.emit("cerradura", true);
            if(topic === "calvija") this.webSocket.emit("calvija", true);
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

        return `${año}-${mes}-git add${dia}T${hora}:${minuto}:${segundo}.000Z`;
    }
}