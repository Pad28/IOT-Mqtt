import { envs } from "./config";
import { connectionDB } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async() => {
    await connectionDB();

    const server = new Server({
        portMqtt: envs.MQTT_PORT,
        portApi: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });
    server.start();
})();