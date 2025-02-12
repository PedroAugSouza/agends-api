"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamInvalidError = void 0;
class ParamInvalidError {
    constructor(customMessage) {
        this.reason = '[Param Invalid Error]';
        this.message = 'This param is invalid';
        if (!customMessage) {
            return;
        }
        this.message = customMessage;
    }
}
exports.ParamInvalidError = ParamInvalidError;
//# sourceMappingURL=param-invalid.error.js.map