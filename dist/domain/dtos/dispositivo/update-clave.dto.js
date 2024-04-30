"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClaveDto = void 0;
const config_1 = require("../../../config");
class UpdateClaveDto {
    constructor(clave) {
        this.clave = clave;
    }
    static create(data) {
        try {
            const validators = new config_1.Validators(data);
            validators.requiredKeys('clave');
            validators.isNumber('clave');
            const { clave } = data;
            return [undefined, new UpdateClaveDto(clave)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateClaveDto = UpdateClaveDto;
