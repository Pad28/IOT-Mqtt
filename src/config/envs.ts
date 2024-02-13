import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    MQTT_PORT: get('MQTT_PORT').required().asPortNumber(), 
}