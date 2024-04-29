"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const config_1 = require("../../../config");
class CreateUserDto {
    constructor(usuario, password) {
        this.usuario = usuario;
        this.password = password;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys('usuario', 'password');
            validators.isString('usuario');
            validators.isString('password');
            const { usuario, password } = data;
            return [undefined, new CreateUserDto(usuario, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.CreateUserDto = CreateUserDto;
