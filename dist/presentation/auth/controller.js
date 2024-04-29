"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class AuthController extends controller_1.AppController {
    constructor(authService) {
        super();
        this.authService = authService;
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = domain_1.LoginUserDto.create(req.body);
            if (error || !loginUserDto)
                return res.status(400).json({ error });
            this.authService.loginUser(loginUserDto)
                .then(user => res.json(user))
                .catch(error => this.triggerError(error, res));
        };
        this.cerradura = (req, res) => {
            const [error, loginCerraduraDto] = domain_1.LoginCerraduraDto.create(req.body);
            if (error || !loginCerraduraDto)
                return res.status(400).json({ error });
            this.authService.loginCerradura(loginCerraduraDto)
                .then(result => res.json(result))
                .catch(error => this.triggerError(error, res));
        };
        this.verifyToken = (req, res) => {
            const token = req.header('Authorization');
            if (!token)
                return res.status(400).json({ error: 'Token no viene en la peticion' });
            res.json({
                user: req.authenticatedUser,
                token: token.split(' ').at(1),
            });
        };
    }
}
exports.AuthController = AuthController;
