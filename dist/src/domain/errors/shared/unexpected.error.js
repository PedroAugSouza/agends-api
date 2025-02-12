"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
class UnexpectedError {
    constructor(error) {
        this.reason = '[Internal server error]';
        this.message = String(error);
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=unexpected.error.js.map