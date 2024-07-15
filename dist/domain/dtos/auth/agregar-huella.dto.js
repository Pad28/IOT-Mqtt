"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgregarHuellaDto = void 0;
const config_1 = require("../../../config");
class AgregarHuellaDto {
    constructor(clave) {
        this.clave = clave;
    }
    static create(object) {
        try {
            const validator = new config_1.Validators(object);
            validator.requiredKeys('clave');
            validator.isNumber('clave');
            const { clave } = object;
            return [undefined, new AgregarHuellaDto(clave)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.AgregarHuellaDto = AgregarHuellaDto;
