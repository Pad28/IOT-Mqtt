"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispositivosController = void 0;
const controller_1 = require("../controller");
const domain_1 = require("../../domain");
class DispositivosController extends controller_1.AppController {
    constructor(dispositivosService) {
        super();
        this.dispositivosService = dispositivosService;
        this.getEstados = (req, res) => {
            this.dispositivosService.getEsatdos()
                .then(dispositivos => res.json(dispositivos))
                .catch(error => this.triggerError(error, res));
        };
        this.getClaves = (req, res) => {
            this.dispositivosService.getClaves()
                .then(claves => res.json(claves))
                .catch(error => this.triggerError(error, res));
        };
        this.putClaves = (req, res) => {
            const [error, updateDto] = domain_1.UpdateClaveDto.create(req.body);
            if (error || !updateDto)
                return res.status(400).json({ error });
            this.dispositivosService.putClaves(Object.assign({}, req.body))
                .then(claves => res.json(claves))
                .catch(error => this.triggerError(error, res));
        };
    }
}
exports.DispositivosController = DispositivosController;
