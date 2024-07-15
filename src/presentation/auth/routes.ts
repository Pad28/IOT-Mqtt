import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services";
import { AuthMiddleware } from "../Middlewares";

export class AuthRoutes {
    static get routes(): Router{
        const router = Router();
        const controller = new AuthController(
            new AuthService(),
        );

        router.post('/login', controller.loginUser);
        router.post('/cerradura', controller.cerradura);
        router.post('/agregar-huella', controller.loginAgregarHuella);
        
        router.post('/verify-jwt', [
            AuthMiddleware.validateUserJwt
        ], controller.verifyToken);

        return router;
    }
}