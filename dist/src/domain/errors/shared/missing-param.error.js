"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError {
    constructor(param) {
        this.reason = '[Missing Param Error]';
        this.message = `the param "${param}" is missing`;
    }
}
exports.MissingParamError = MissingParamError;
//# sourceMappingURL=missing-param.error.js.map