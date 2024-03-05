import path from 'path';

import express, { Application, Router } from 'express';
import mosca from 'mosca';
import cors from 'cors';
import compression from 'compression';

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

    constructor(options: ServerOptions) {
        const { portMqtt, portApi, publicPath, routes } = options;
        this.portMqtt = portMqtt;
        this.app = express();
        this.portApi = portApi;
        this.publicPath = publicPath;
        this.routes = routes;
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
        })

        this.app.listen(this.portApi, () => {
            console.log(`Servidor escuchando en el puerto ${this.portApi}`);
        });

        const broker = new mosca.Server({ port: this.portMqtt });
        broker.on('ready', () => {
            console.log(`Broker MQTT en puerto ${this.portMqtt}`);

            broker.on('clientConnected', (client: mosca.Client) => {
                console.log('Cliente: ', client.id);
            })

        })

    }
}