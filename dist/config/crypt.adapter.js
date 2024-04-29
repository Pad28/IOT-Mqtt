"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptjsAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
exports.cryptjsAdapter = {
    hash: (password) => {
        const salt = (0, bcryptjs_1.genSaltSync)(15);
        return (0, bcryptjs_1.hashSync)(password, salt);
    },
    compare: (password, hashed) => {
        return (0, bcryptjs_1.compareSync)(password, hashed);
    }
};
