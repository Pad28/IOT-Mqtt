"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class UserController extends controller_1.AppController {
    constructor(userService) {
        super();
        this.userService = userService;
        this.createUser = (req, res) => {
            const [error, createUserDto] = domain_1.CreateUserDto.create(req.body);
            if (error || !createUserDto)
                return res.status(400).json({ error });
            this.userService.createUser(createUserDto)
                .then(user => res.json({ user }))
                .catch(error => this.triggerError(error, res));
        };
        this.updateUser = (req, res) => {
            const [error, updateUserDto] = domain_1.UpdareUserDto.create(req.body);
            if (error || !updateUserDto)
                return res.status(400).json({ error });
        };
    }
}
exports.UserController = UserController;
