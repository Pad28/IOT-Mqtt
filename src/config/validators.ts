
export class Validators {

    constructor(
        private readonly data: {[key: string]: any}
    ) {}

    public requiredKeys( ...keys: string[]) {
        keys.forEach(k => {
            if(!this.data[k]) throw `${k} faltante`;
        })
    }

    public isRequired(key: string) {
        if(!this.data[key]) throw `${key} faltante`;
    }

    public isEmail(key: string) {
        this.isRequired(key);
        const regular = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regular.test(this.data[key])) throw `${key} no es un correo valido`;
    }

    public isUIID(key: string) {
        this.isRequired(key);
        const relugar = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if(!relugar.test(this.data[key])) throw `${key} no es un UUID valido`;
    }

    public isNumber(key: string) {
        this.isRequired(key);
        if(isNaN(this.data[key])) throw `${key} no es un numero valido`;
        this.data[key] = parseInt(this.data[key]);
    }

    public isFloat(key: string) {
        this.isRequired(key);
        if(isNaN(this.data[key])) throw `${key} no es un numero valido`;
        this.data[key] = parseFloat(this.data[key]);
    }

    public capitalizar(key: string) {
        this.isRequired(key);
        const str = this.data[key] as string;
        const array = str.split(' ');
        array.forEach((s, i) => {
            s = s.toLowerCase();
            const primarCaracter = s.at(0)?.toUpperCase();
            const restoCadena = s.slice(1);;
            array[i] = primarCaracter + restoCadena;
        });

        this.data[key] = array.join(' ');
    }

    public isBoolean(key: string) {
        if( typeof this.data[key] !== 'boolean') throw `${key} no es un boolean valido`;        
    }
    
    public toUpperCase(key: string) {
        this.isRequired(key);
        this.data[key] = (this.data[key] as string).toUpperCase();
    }

    public isDate(key: string) {
        this.isRequired(key);
        const newDate = new Date(this.data[key]);
        if(newDate.toString() === 'Invalid Date') throw `${key} no es una fecha valida`;
        this.data[key] = newDate;
    }
    
    public isString(key: string) {
        this.isRequired(key);
        if(typeof this.data[key] !== "string") throw `${key} no es una cadena valida`;
        this.data[key] = this.data[key] as string;
    }

    public checkPattern(key: string, pattern: RegExp) {
        this.isRequired(key);
        if(!pattern.test(this.data[key])) throw `${key} no valido`;
    }

    public ifExistCapitalizar(key: string) {
        if(this.data[key] && this.data[key].lenght !== 0) this.capitalizar(key);
    }

    public ifExistIsNumber(key: string) {
        if(this.data[key]) this.isNumber(key);
    }

    public ifExistIsFloat(key: string) {
        if(this.data[key]) this.isFloat(key);
    }

    public ifExistIsDate(key: string) {
        if(this.data[key]) this.isDate(key);
    }

    public ifExistUpperCase(key: string) {
        if(this.data[key]) this.toUpperCase(key);
    }
    
    public ifExistIsUUID(key: string) {
        if(this.data[key]) this.isUIID(key);
    }
}