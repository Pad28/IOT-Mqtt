import { prisma } from "../../data";


export class DispositivosService {
    constructor() {}

    public async getEsatdos() {
        const { dispositivo } = prisma;
        return await dispositivo.findMany({ select: { alias: true, estado: true } });
    }
}