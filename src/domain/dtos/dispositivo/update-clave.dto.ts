import { Validators } from "../../../config";

export class UpdateClaveDto {
    private constructor(
        public readonly clave: number,
    ) {}

    static create(data: {[key: string]: any}): [string?, UpdateClaveDto?] {
        try {
            
            const validators = new Validators(data);
            validators.requiredKeys('clave');
            validators.isNumber('clave');
            
            const { clave } = data;
            return [undefined, new UpdateClaveDto(clave)];
        } catch (error) {
            return [error as string];
        }
    }
}