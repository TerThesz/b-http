"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const divideString = (string, search) => {
    const index = string.indexOf(search);
    const first = string.slice(0, index);
    const rest = string.slice(index + search.length);
    return [first, rest];
};
exports.default = divideString;
//# sourceMappingURL=divide_string.js.map