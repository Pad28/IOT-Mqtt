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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispositivosService = void 0;
const data_1 = require("../../data");
class DispositivosService {
    constructor() { }
    getEsatdos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { dispositivo } = data_1.prisma;
            return yield dispositivo.findMany({ select: { alias: true, estado: true } });
        });
    }
    getClaves() {
        return __awaiter(this, void 0, void 0, function* () {
            const { dispositivo } = data_1.prisma;
            return yield dispositivo.findMany({ where: { alias: "cerradura" }, select: { clave: true } });
        });
    }
}
exports.DispositivosService = DispositivosService;
