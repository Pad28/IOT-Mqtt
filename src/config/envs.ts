import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    MQTT_PORT: get('MQTT_PORT').required().asPortNumber(),
    USER_ADMIN: get('USER_ADMIN').required().asString(),
    PASSWORD_ADMIN: get('PASSWORD_ADMIN').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
}