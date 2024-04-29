"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    PUBLIC_PATH: (0, env_var_1.get)('PUBLIC_PATH').default('public').asString(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asString(),
    MQTT_PORT: (0, env_var_1.get)('MQTT_PORT').required().asPortNumber(),
    USER_ADMIN: (0, env_var_1.get)('USER_ADMIN').required().asString(),
    PASSWORD_ADMIN: (0, env_var_1.get)('PASSWORD_ADMIN').required().asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
};
