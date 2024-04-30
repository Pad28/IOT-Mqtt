import { prisma } from "../../data";

export class EventosService {
    constructor() {}

    public async getEventos() {
        const { eventos } = prisma;
        return await eventos.findMany({
            include:{ fk_dispositivo: true, fk_user: true },
            orderBy: { fecha_hora: "desc" }
        });
    }
}