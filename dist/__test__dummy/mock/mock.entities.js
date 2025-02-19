"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitDummy = exports.getTagDummy = exports.getEventDummy = exports.getUserDummy = void 0;
const event_entity_1 = require("../../src/domain/entities/event/event.entity");
const habit_entity_1 = require("../../src/domain/entities/habit/habit.entity");
const tag_entity_1 = require("../../src/domain/entities/tag/tag.entity");
const user_entity_1 = require("../../src/domain/entities/user/user.entity");
const user_status_value_object_1 = require("../../src/domain/value-objects/user-status.value-object");
const getUserDummy = () => {
    const dateBirth = new Date();
    dateBirth.setFullYear(2005);
    const user = new user_entity_1.User({
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: '123456789',
        status: user_status_value_object_1.UserStatusValueObject.ENABLE,
        dateBirth,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return user.result.value;
};
exports.getUserDummy = getUserDummy;
const getEventDummy = () => {
    const event = new event_entity_1.Event({
        allDay: true,
        name: 'event test',
        createdAt: new Date(),
        updatedAt: new Date(),
        date: new Date(),
        tagUuid: (0, exports.getTagDummy)().uuid,
    });
    return event.result.value;
};
exports.getEventDummy = getEventDummy;
const getTagDummy = () => {
    const tag = new tag_entity_1.Tag({
        name: 'test',
        userUuid: (0, exports.getUserDummy)().uuid,
        color: '#10b981',
    });
    return tag.result.value;
};
exports.getTagDummy = getTagDummy;
const getHabitDummy = () => {
    const habit = new habit_entity_1.Habit({
        name: 'test',
        color: '#10b981',
        dayHabit: [0, 1, 2],
        userUuid: (0, exports.getUserDummy)().uuid,
    });
    return habit.result.value;
};
exports.getHabitDummy = getHabitDummy;
//# sourceMappingURL=mock.entities.js.map