import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { prisma } from "../../data";
import { User } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            authenticatedUser: User;
        }
    }
}

export class AuthMiddleware {

    static async validateUserJwt(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({ error: 'No hay token en la peticion' });
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Token Bearer invalido' });

        const token = authorization.split(' ').at(1) || '';
        try {
            
            const payload = await JwtAdapter.validateToken<{ id: string }>(token);
            if(!payload) return res.status(401).json({ error: 'Token no valido' });

            const user = await prisma.user.findUnique({ where: { id: payload.id } });
            if(!user) return res.status(401).json({ error: 'Token no valido' });

            req.authenticatedUser = user;
            next();

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}