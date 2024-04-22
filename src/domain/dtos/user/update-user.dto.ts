import { Validators } from "../../../config";

export class UpdareUserDto {
    constructor(
        public readonly id: string,
        public readonly usuario?: string,
        public readonly password?: string,
    ) {}

    get values() {
        const obj: {[key: string]: any} = {};
        for(const k in this) {
            if(this[k]) obj[k] = this[k];
        }

        return obj;
    }

    static create( object: {[key: string]: any} ):[ string?, UpdareUserDto? ] {
        try {
            const validators = new Validators(object);
            validators.requiredKeys("id");
            validators.isUIID("id");
            validators.ifExistCapitalizar("usuario")
            validators.isString("password")

            const {id, usuario, password} = object;
            return [undefined, new UpdareUserDto(
                id, usuario, password
            )];
        } catch (error) {
            return [error as string]            
        }

    }

}