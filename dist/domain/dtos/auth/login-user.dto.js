"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../../config");
class LoginUserDto {
    constructor(usuario, password) {
        this.usuario = usuario;
        this.password = password;
    }
    static create(object) {
        try {
            const validator = new config_1.Validators(object);
            validator.requiredKeys('usuario', 'password');
            const { usuario, password } = object;
            return [undefined, new LoginUserDto(usuario, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.LoginUserDto = LoginUserDto;
