import { prisma } from "../../data";
import { UpdateClaveDto } from "../../domain";


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

    public async putClaves(updateClaveDto: UpdateClaveDto) {
        const { dispositivo } = prisma;
        return await dispositivo.update({ 
            where: { alias: "cerradura" }, 
            data: { clave: updateClaveDto.clave } }
        );
    }
}