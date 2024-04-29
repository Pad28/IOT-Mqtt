"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const eventos_service_1 = require("../services/eventos.service");
class EventosRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.EventosController(new eventos_service_1.EventosService());
        router.get('/', [], controller.getEventos);
        return router;
    }
}
exports.EventosRoutes = EventosRoutes;
