"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDummy = void 0;
const user_entity_1 = require("../../src/domain/entities/user/user.entity");
const user_status_value_object_1 = require("../../src/domain/value-objects/user-status.value-object");
const getUserDummy = () => {
    const dateBirth = new Date();
    dateBirth.setFullYear(2005);
    const user = new user_entity_1.User({
        name: 'John Doe',
        email: 'johndoe@teste.com',
        password: '123456789',
        status: user_status_value_object_1.UserStatusValueObject.ENABLE,
        dateBirth,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return user.result.value;
};
exports.getUserDummy = getUserDummy;
//# sourceMappingURL=mock.entities.js.map