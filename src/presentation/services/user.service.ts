import { cryptjsAdapter } from "../../config";
import { prisma } from "../../data";
import { CreateUserDto, CustomError } from "../../domain";

export class UserService {
    constructor() {}

    public async createUser (createUserDto: CreateUserDto) {
        const { user } = prisma;
        const existUser = await user.findUnique({ where: { usuario: createUserDto.usuario } });
        if(existUser) {
            throw CustomError.badRequest(`El usuario ${createUserDto.usuario} ya fue registrado`);
        }
        const newPassword = cryptjsAdapter.hash(createUserDto.password);
        const { password, ...newUser } = await user.create({ data: { 
            ...createUserDto, password: newPassword 
        }});

        return newUser;
    }
}