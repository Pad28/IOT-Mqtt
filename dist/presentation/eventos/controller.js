"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventosController = void 0;
const controller_1 = require("../controller");
class EventosController extends controller_1.AppController {
    constructor(eventosService) {
        super();
        this.eventosService = eventosService;
        this.getEventos = (req, res) => {
            this.eventosService.getEventos()
                .then(eventos => res.json(eventos))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.EventosController = EventosController;
