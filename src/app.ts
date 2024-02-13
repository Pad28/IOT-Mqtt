import { envs } from "./config";
import { Server } from "./presentation/server";

(async() => {
    
    const server = new Server({
        portBrokerMqtt: envs.MQTT_PORT
    });

    server.start();
})();