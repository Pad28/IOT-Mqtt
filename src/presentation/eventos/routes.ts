import { Router } from "express";
import { EventosController } from "./controller";
import { EventosService } from "../services/eventos.service";
import { AuthMiddleware } from "../Middlewares";

export class EventosRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new EventosController(
            new EventosService(),
        );

        router.get('/', [
            AuthMiddleware.validateUserJwt
        ], controller.getEventos);

        return router;
    }
}