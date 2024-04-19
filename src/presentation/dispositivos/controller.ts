import { Request, Response } from "express";
import { AppController } from "../controller";
import { DispositivosService } from "../services";


export class DispositivosController extends AppController {
    constructor(
        private readonly dispositivosService: DispositivosService,
    ) { super(); }

    public getEstados = (req: Request, res: Response) => {
        this.dispositivosService.getEsatdos()
            .then(dispositivos => res.json(dispositivos))
            .catch(error => this.triggerError(error, res));
    }
}