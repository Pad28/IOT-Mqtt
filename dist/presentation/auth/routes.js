"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("../services");
const Middlewares_1 = require("../Middlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController(new services_1.AuthService());
        router.post('/login', controller.loginUser);
        router.post('/cerradura', controller.cerradura);
        router.post('/verify-jwt', [
            Middlewares_1.AuthMiddleware.validateUserJwt
        ], controller.verifyToken);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
