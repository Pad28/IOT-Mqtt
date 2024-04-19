import mqtt from "mqtt";
import { prisma } from "../../data";

export class MqttController {
    constructor(
        private readonly mqtt: mqtt.MqttClient,
    ) {}

    public passwordCerraduraAsync = async() => {
        return new Promise((resolve) => {
            let password = "";
            this.mqtt.subscribe("autenticar-cerradura");
                this.mqtt.on("message", async(topic, message) => {
                    if(topic === "autenticar-cerradura") {
                        if(message.toLocaleString() !== '#') {
                            password += message.toLocaleString();
                            console.log(password);
                            return;
                        }
                        const device = await prisma.dispositivo.findUnique({ where: { alias: "cerradura" } });
                        if(!device || device.clave !== password) {
                            // this.mqtt.on()
                        }
                        
                    }
                });
        });
    }

    public passwordCerradura = () => {
        let password = "";
        this.mqtt.subscribe("autenticar-cerradura");
            this.mqtt.on("message", async(topic, message) => {
                if(topic === "password-cerradura") {
                    if(message.toLocaleString() !== "#") {
                        password += message.toLocaleString();
                        
                        return;
                    }
                }
                
            });
    }
}