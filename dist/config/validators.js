"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    constructor(data) {
        this.data = data;
    }
    requiredKeys(...keys) {
        keys.forEach(k => {
            if (!this.data[k])
                throw `${k} faltante`;
        });
    }
    isRequired(key) {
        if (!this.data[key])
            throw `${key} faltante`;
    }
    isEmail(key) {
        this.isRequired(key);
        const regular = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regular.test(this.data[key]))
            throw `${key} no es un correo valido`;
    }
    isUIID(key) {
        this.isRequired(key);
        const relugar = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!relugar.test(this.data[key]))
            throw `${key} no es un UUID valido`;
    }
    isNumber(key) {
        this.isRequired(key);
        if (isNaN(this.data[key]))
            throw `${key} no es un numero valido`;
        this.data[key] = parseInt(this.data[key]);
    }
    isFloat(key) {
        this.isRequired(key);
        if (isNaN(this.data[key]))
            throw `${key} no es un numero valido`;
        this.data[key] = parseFloat(this.data[key]);
    }
    capitalizar(key) {
        this.isRequired(key);
        const str = this.data[key];
        const array = str.split(' ');
        array.forEach((s, i) => {
            var _a;
            s = s.toLowerCase();
            const primarCaracter = (_a = s.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase();
            const restoCadena = s.slice(1);
            ;
            array[i] = primarCaracter + restoCadena;
        });
        this.data[key] = array.join(' ');
    }
    isBoolean(key) {
        if (typeof this.data[key] !== 'boolean')
            throw `${key} no es un boolean valido`;
    }
    toUpperCase(key) {
        this.isRequired(key);
        this.data[key] = this.data[key].toUpperCase();
    }
    isDate(key) {
        this.isRequired(key);
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date')
            throw `${key} no es una fecha valida`;
        this.data[key] = newDate;
    }
    isString(key) {
        this.isRequired(key);
        if (typeof this.data[key] !== "string")
            throw `${key} no es una cadena valida`;
        this.data[key] = this.data[key];
    }
    checkPattern(key, pattern) {
        this.isRequired(key);
        if (!pattern.test(this.data[key]))
            throw `${key} no valido`;
    }
    ifExistCapitalizar(key) {
        if (this.data[key] && this.data[key].lenght !== 0)
            this.capitalizar(key);
    }
    ifExistIsNumber(key) {
        if (this.data[key])
            this.isNumber(key);
    }
    ifExistIsFloat(key) {
        if (this.data[key])
            this.isFloat(key);
    }
    ifExistIsDate(key) {
        if (this.data[key])
            this.isDate(key);
    }
    ifExistUpperCase(key) {
        if (this.data[key])
            this.toUpperCase(key);
    }
    ifExistIsUUID(key) {
        if (this.data[key])
            this.isUIID(key);
    }
}
exports.Validators = Validators;
