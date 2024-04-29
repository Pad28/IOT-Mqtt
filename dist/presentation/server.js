"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const mosca_1 = __importDefault(require("mosca"));
const mqtt_1 = __importDefault(require("mqtt"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const data_1 = require("../data");
class Server {
    constructor(options) {
        const { portMqtt, portApi, publicPath, routes } = options;
        this.portMqtt = portMqtt;
        this.app = (0, express_1.default)();
        this.portApi = portApi;
        this.publicPath = publicPath;
        this.routes = routes;
        this.server = (0, http_1.createServer)(this.app);
        this.webSocket = new socket_io_1.Server(this.server);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Middlewares
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, cors_1.default)());
            this.app.use((0, compression_1.default)());
            // Public folder
            this.app.use(express_1.default.static(this.publicPath));
            // Routes
            this.app.use(this.routes);
            this.app.get('*', (req, res) => {
                res.sendFile(path_1.default.join(__dirname, `../../${this.publicPath}`, 'index.html'));
            });
            this.server.listen(this.portApi, () => {
                console.log(`Servidor escuchando en el puerto ${this.portApi}`);
            });
            this.mqttConfig();
            this.socket();
        });
    }
    mqttConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const broker = new mosca_1.default.Server({ port: this.portMqtt });
            broker.on('ready', () => {
                console.log(`Broker MQTT en puerto ${this.portMqtt}`);
            });
        });
    }
    socket() {
        return __awaiter(this, void 0, void 0, function* () {
            this.webSocket.on('connection', (socket) => {
                const sub = mqtt_1.default.connect(`mqtt://localhost:${this.portMqtt}`);
                sub.on('connect', () => {
                    sub.subscribe('autenticar_cerradura');
                    sub.on('message', (topic, message) => __awaiter(this, void 0, void 0, function* () {
                        if (topic === "autenticar_cerradura") {
                            socket.emit("autenticar_cerradura");
                            yield data_1.prisma.dispositivo.update({
                                where: { alias: "cerradura" },
                                data: { estado: "ABIERTA" }
                            });
                        }
                    }));
                });
                socket.on("foco", (payload, callback) => {
                    const pub = mqtt_1.default.connect('mqtt://localhost:8083');
                    pub.on('connect', (packet) => __awaiter(this, void 0, void 0, function* () {
                        pub.publish('state_foco', process.argv[2]);
                        pub.end();
                        const foco = yield data_1.prisma.dispositivo.findUnique({ where: { alias: "foco" } });
                        if (!foco)
                            throw new Error("Foco no en base de datos");
                        yield Promise.all([
                            data_1.prisma.dispositivo.update({
                                where: { id: foco.id },
                                data: { estado: (foco.estado === "APAGADO") ? "ENCENDIDO" : "APAGADO" }
                            }),
                            data_1.prisma.eventos.create({ data: {
                                    fecha_hora: this.generarFechaActual(),
                                    id_dispositvo: foco.id,
                                    id_user: payload,
                                } }),
                        ]);
                    }));
                });
                socket.on("clavija", (payload, callback) => {
                    const pub = mqtt_1.default.connect('mqtt://localhost:8083');
                    pub.on('connect', (packet) => __awaiter(this, void 0, void 0, function* () {
                        pub.publish('clavija', process.argv[2]);
                        pub.end();
                        const clavija = yield data_1.prisma.dispositivo.findUnique({ where: { alias: "clavija" } });
                        if (!clavija)
                            throw new Error("Clavija no en base de datos");
                        yield Promise.all([
                            data_1.prisma.dispositivo.update({
                                where: { id: clavija.id },
                                data: { estado: (clavija.estado === "APAGADO") ? "ENCENDIDO" : "APAGADO" }
                            }),
                            data_1.prisma.eventos.create({ data: {
                                    fecha_hora: this.generarFechaActual(),
                                    id_dispositvo: clavija.id,
                                    id_user: payload,
                                } }),
                        ]);
                    }));
                });
                socket.on("cerradura", (payload, callback) => {
                    const pub = mqtt_1.default.connect('mqtt://localhost:8083');
                    pub.on('connect', (packet) => __awaiter(this, void 0, void 0, function* () {
                        pub.publish('cerradura', process.argv[2]);
                        pub.end();
                        const cerradura = yield data_1.prisma.dispositivo.findUnique({ where: { alias: "cerradura" } });
                        if (!cerradura)
                            throw new Error("Clavija no en base de datos");
                        yield Promise.all([
                            data_1.prisma.dispositivo.update({
                                where: { id: cerradura.id },
                                data: { estado: (cerradura.estado === "ABIERTA") ? "BLOQUEADA" : "ABIERTA" }
                            }),
                            data_1.prisma.eventos.create({ data: {
                                    fecha_hora: this.generarFechaActual(),
                                    id_dispositvo: cerradura.id,
                                    id_user: payload,
                                } }),
                        ]);
                    }));
                });
            });
        });
    }
    generarFechaActual() {
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
exports.Server = Server;