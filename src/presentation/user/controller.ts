import { Request, Response } from "express";
import { AppController } from "../controller";
import { CreateUserDto, UpdareUserDto } from "../../domain";
import { UserService } from "../services";

export class UserController extends AppController {
    constructor(
        private readonly userService: UserService,
    ) { super(); }

    public createUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if(error || !createUserDto) return res.status(400).json({ error });
        this.userService.createUser(createUserDto)
            .then(user => res.json({ user }))
            .catch(error => this.triggerError(error, res));        
    };

    public updateUser = (req: Request, res: Response) => {
        const [error, updateUserDto] = UpdareUserDto.create(req.body);
        if(error || !updateUserDto) return res.status(400).json({ error });
        this.userService.updateUser(updateUserDto)
            .then(user => res.json(user))
            .catch(error => this.triggerError(error, res));
    }

}