import { Request, Response } from "express";
import { AppController } from "../controller";
import { DispositivosService } from "../services";
import { UpdateClaveDto } from "../../domain";


export class DispositivosController extends AppController {
    constructor(
        private readonly dispositivosService: DispositivosService,
    ) { super(); }

    public getEstados = (req: Request, res: Response) => {
        this.dispositivosService.getEsatdos()
            .then(dispositivos => res.json(dispositivos))
            .catch(error => this.triggerError(error, res));
    }

    public getClaves = (req: Request, res: Response) => {
        this.dispositivosService.getClaves()
            .then(claves => res.json( claves ))
            .catch(error => this.triggerError(error, res));
    }

    public getHuella = (req: Request, res: Response) => {
        this.dispositivosService.getHuella()
            .then(claves => res.json( claves ))
            .catch(error => this.triggerError(error, res));
    }

    public putClaves = (req: Request, res: Response) => {
        const [error, updateDto] = UpdateClaveDto.create(req.body);
        if(error || !updateDto) return res.status(400).json({ error });

        this.dispositivosService.putClaves({ ...req.body })
            .then(claves => res.json( claves ))
            .catch(error => this.triggerError(error, res));
    }
}