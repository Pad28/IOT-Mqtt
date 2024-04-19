import { Request, Response } from "express";
import { AppController } from "../controller";
import { EventosService } from "../services/eventos.service";

export class EventosController extends AppController {
    constructor(
        private readonly eventosService: EventosService,
    ) { super(); }

    public getEventos = (req: Request, res: Response) => {
        this.eventosService.getEventos()
            .then(eventos => res.json(eventos))
            .catch(error => this.triggerError(error, res));
    }
}