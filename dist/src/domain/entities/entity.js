"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const crypto_1 = require("crypto");
class Entity {
    constructor() {
        this.props = {};
    }
    create(props, uuid) {
        Object.assign(this.props, props);
        if (!uuid) {
            this.uuid = (0, crypto_1.randomUUID)();
            return;
        }
        this.uuid = uuid;
    }
    toValue() {
        return {
            ...this.props,
            uuid: this.uuid,
        };
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map