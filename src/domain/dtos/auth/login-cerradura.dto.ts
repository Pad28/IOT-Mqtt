import { Validators } from "../../../config";

export class LoginCerraduraDto {
    private constructor(
        public readonly clave: number,
    ) {}

    static create( object: {[key: string]: any} ): [string?, LoginCerraduraDto?] {
        try {
            const validator = new Validators(object);

            validator.requiredKeys('clave');
            validator.isNumber('clave');
            const { clave } = object;
            return [undefined, new LoginCerraduraDto(clave)];
        } catch (error) {
            return [error as string];            
        }

    }
}