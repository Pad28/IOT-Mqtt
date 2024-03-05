import { PrismaClient } from "@prisma/client"
import { cryptjsAdapter, envs } from "../../config";

export const prisma = new PrismaClient();
export const connectionDB = async() => {
    try {
        prisma.$connect();
        console.log('Base de datos online');
        
        const { USER_ADMIN, PASSWORD_ADMIN } = envs;
        const admin = await prisma.user.findUnique({ where: { usuario: USER_ADMIN } });
        
        if(!admin) {
            await prisma.user.create({ data: {
                usuario: USER_ADMIN,
                password: cryptjsAdapter.hash(PASSWORD_ADMIN),
            }});
            console.log('Admin creado');
        }
        
    } catch (error) {
        throw error;
    }
}