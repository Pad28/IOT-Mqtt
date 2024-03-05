import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../Middlewares";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new UserController(
            new UserService(),
        );

        router.post('/', [
            AuthMiddleware.validateUserJwt,
        ], controller.createUser);

        return router;
    }
}