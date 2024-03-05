import { Request, Response } from "express";
import { AppController } from "../controller";
import { LoginUserDto } from "../../domain";
import { AuthService } from "../services";

export class AuthController extends AppController{
    constructor(
        private readonly authService: AuthService,
    ) { super(); }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error || !loginUserDto) return res.status(400).json({ error });
        this.authService.loginUser(loginUserDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

    public verifyToken = (req: Request, res: Response) => {
        const token = req.header('Authorization');
        if(!token) return res.status(400).json({ error: 'Token no viene en la peticion' });
        
        res.json({
            user: req.authenticatedUser,
            token: token.split(' ').at(1),
        })
    }
}