import { Validators } from "../../../config";

export class CreateUserDto {
    private constructor(
        public readonly usuario: string,
        public readonly password: string,
    ) {}

    static create(data: {[key: string]: any}): [string?, CreateUserDto?] {
        try {
            const validators = new Validators(data);
            validators.requiredKeys('usuario', 'password');

            validators.isString('usuario');
            validators.isString('password');

            const { usuario, password } = data;
            return [undefined, new CreateUserDto(usuario, password)];
        } catch (error) {
            return [error as string];
        }
    }
}