"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const data_1 = require("../../data");
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class AuthService {
    constructor() { }
    loginUser(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = data_1.prisma;
            const existUser = yield user.findUnique({ where: { usuario: loginUserDto.usuario } });
            if (!existUser)
                throw domain_1.CustomError.badRequest('Usuario o contraseña no valido');
            const isMatch = config_1.cryptjsAdapter.compare(loginUserDto.password, existUser.password);
            if (!isMatch)
                throw domain_1.CustomError.badRequest('Usuario o contraseña no valido');
            const token = yield config_1.JwtAdapter.generateToken({ id: existUser.id });
            if (!token)
                throw domain_1.CustomError.internalServerError();
            const { password } = existUser, data = __rest(existUser, ["password"]);
            return {
                user: data,
                token,
            };
        });
    }
    loginCerradura(loginCerradura) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dispositivo } = data_1.prisma;
            const cerradura = yield dispositivo.findUnique({ where: { alias: "cerradura" } });
            if (!cerradura)
                throw domain_1.CustomError.internalServerError("Cerradura no registrada");
            const isMatch = cerradura.clave === loginCerradura.clave;
            if (!isMatch)
                throw domain_1.CustomError.badRequest("Clave no valida");
            yield dispositivo.update({
                where: { alias: "cerradura" },
                data: { estado: "ABIERTA" }
            });
            return { msg: "Cerradura desbloqueada" };
        });
    }
    loginAgregarHuella(huellaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dispositivo } = data_1.prisma;
            const cerradura = yield dispositivo.findUnique({ where: { alias: "cerradura" } });
            if (!cerradura)
                throw domain_1.CustomError.internalServerError("Cerradura no registrada");
            const isMatch = cerradura.claveHuella === huellaDto.clave;
            if (!isMatch)
                throw domain_1.CustomError.badRequest("Clave no valida");
            return { msg: "Huella desbloqueada" };
        });
    }
}
exports.AuthService = AuthService;
