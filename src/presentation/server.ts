import mosca from 'mosca';

interface ServerOptions {
    portBrokerMqtt: number;
}

export class Server {

    private readonly portBrokerMqtt: number;

    constructor(options: ServerOptions) {
        const { portBrokerMqtt } = options;
        this.portBrokerMqtt = portBrokerMqtt;
    }   

    public async start() {

        const broker = new mosca.Server({ port: this.portBrokerMqtt });
        broker.on('ready', () => {
            console.log('Broker Ok');

            broker.on('clientConnected', (client: mosca.Client) => {
                console.log('Cliente: ', client.id);
            })

        })

    }
}