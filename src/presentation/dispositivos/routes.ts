import { Router } from "express";
import { DispositivosController } from "./controller";
import { DispositivosService } from "../services";
import { AuthMiddleware } from "../Middlewares";

export class DispositivosRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new DispositivosController(
            new DispositivosService()
        );

        router.get('/estados', [
            AuthMiddleware.validateUserJwt
        ], controller.getEstados);

        return router;
    }
}