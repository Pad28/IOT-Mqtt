"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const domain_1 = require("../domain");
class AppController {
    constructor() {
        this.triggerError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(`${error}`);
            return res.status(500).json({ error: 'Error interno del servidor' });
        };
    }
}
exports.AppController = AppController;
