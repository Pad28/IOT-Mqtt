
import { Validators } from "../../../config";

export class AgregarHuellaDto {
    private constructor(
        public readonly clave: number,
    ) {}

    static create( object: {[key: string]: any} ): [string?, AgregarHuellaDto?] {
        try {
            const validator = new Validators(object);

            validator.requiredKeys('clave');
            validator.isNumber('clave');
            const { clave } = object;
            return [undefined, new AgregarHuellaDto(clave)];
        } catch (error) {
            return [error as string];            
        }

    }
}