import { Router } from "express";
import { DispositivosController } from "./controller";
import { DispositivosService } from "../services";

export class DispositivosRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new DispositivosController(
            new DispositivosService()
        );

        router.get('/estados', [
            // AuthMiddleware.validateUserJwt
        ], controller.getEstados);

        router.get("/claves", controller.getClaves);
 
        router.put("/claves", controller.putClaves);

        return router;
    }
}