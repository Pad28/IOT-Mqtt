"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdareUserDto = void 0;
const config_1 = require("../../../config");
class UpdareUserDto {
    constructor(id, usuario, password) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
    }
    get values() {
        const obj = {};
        for (const k in this) {
            if (this[k])
                obj[k] = this[k];
        }
        return obj;
    }
    static create(object) {
        try {
            const validators = new config_1.Validators(object);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("usuario");
            const { id, usuario, password } = object;
            return [undefined, new UpdareUserDto(id, usuario, password)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdareUserDto = UpdareUserDto;
