"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const user_service_1 = require("../services/user.service");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController(new user_service_1.UserService());
        router.post('/', [], controller.createUser);
        router.put("/", controller.updateUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
