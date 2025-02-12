"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const param_invalid_error_1 = require("../../errors/shared/param-invalid.error");
const entity_1 = require("../entity");
const either_1 = require("../../../infra/utils/either/either");
class User extends entity_1.Entity {
    constructor(props, uuid) {
        super();
        if (props.password.length < 8) {
            this.result = new either_1.Left(new param_invalid_error_1.ParamInvalidError('Password invalid, has less than eight catacters'));
            return;
        }
        const now = new Date();
        if (now.getFullYear() - props.dateBirth.getFullYear() <= 12) {
            this.result = new either_1.Left(new param_invalid_error_1.ParamInvalidError('User not has more than twelve years'));
            return;
        }
        this.create(props, uuid);
        this.result = new either_1.Right(this.toValue());
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map