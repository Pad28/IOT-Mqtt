"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispositivosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
class DispositivosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.DispositivosController(new services_1.DispositivosService());
        router.get('/estados', [
        // AuthMiddleware.validateUserJwt
        ], controller.getEstados);
        router.get("/claves", controller.getClaves);
        return router;
    }
}
exports.DispositivosRoutes = DispositivosRoutes;
