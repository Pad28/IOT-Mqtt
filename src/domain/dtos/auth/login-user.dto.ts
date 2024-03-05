import { Validators } from "../../../config";

export class LoginUserDto {
    private constructor(
        public readonly usuario: string,
        public readonly password: string,
    ) {}

    static create( object: {[key: string]: any} ): [string?, LoginUserDto?] {
        try {
            const validator = new Validators(object);

            validator.requiredKeys('usuario', 'password');

            const { usuario, password } = object;
            return [undefined, new LoginUserDto(usuario, password)];
        } catch (error) {
            return [error as string];            
        }

    }
}