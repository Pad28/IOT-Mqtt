import { prisma } from "../../data";
import { JwtAdapter, cryptjsAdapter } from "../../config";
import { CustomError, LoginCerraduraDto, LoginUserDto } from "../../domain";

export class AuthService {
    constructor() {}

    public async loginUser(loginUserDto: LoginUserDto) {
        const { user } = prisma;
        const existUser = await user.findUnique({ where: { usuario: loginUserDto.usuario } });
        if(!existUser) throw CustomError.badRequest('Usuario o contraseña no valido');

        const isMatch = cryptjsAdapter.compare(loginUserDto.password, existUser.password);
        if(!isMatch) throw CustomError.badRequest('Usuario o contraseña no valido');

        const token = await JwtAdapter.generateToken({ id: existUser.id });
        if(!token) throw CustomError.internalServerError();

        const {password, ...data} = existUser;
        return {
            user: data,
            token,
        }
    }

    public async loginCerradura(loginCerradura: LoginCerraduraDto) {
        const { dispositivo } = prisma;
        const cerradura = await dispositivo.findUnique({ where: { alias: "cerradura" } });
        if(!cerradura) throw CustomError.internalServerError("Cerradura no registrada");
        const isMatch = cerradura.clave === loginCerradura.clave;
        if(!isMatch) throw CustomError.badRequest("Clave no valida");

        await dispositivo.update({
            where: { alias: "cerradura" },
            data: { estado: "ABIERTA" }
        });

        return { msg: "Cerradura desbloqueada" };
    }
}