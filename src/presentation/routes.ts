import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { AuthRoutes } from "./auth/routes";
import { DispositivosRoutes } from "./dispositivos/routes";
import { EventosRoutes } from "./eventos/routes";

export class AppRoutes{
    public static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/dispositivo', DispositivosRoutes.routes);
        router.use('/api/eventos', EventosRoutes.routes);
        router.use('/api/user', UserRoutes.routes);

        return router;
    }
}