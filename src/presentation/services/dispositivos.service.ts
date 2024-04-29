import { prisma } from "../../data";


export class DispositivosService {
    constructor() {}

    public async getEsatdos() {
        const { dispositivo } = prisma;
        return await dispositivo.findMany({ select: { alias: true, estado: true } });
    }

    public async getClaves() {
        const { dispositivo } = prisma;
        return await dispositivo.findMany({ where: { alias: "cerradura" }, select:{ clave: true } });
    }
}