"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    age: {
        unique: true,
        type: Number,
        min: 18,
    },
});
const testModel = (0, mongoose_1.model)('test', testSchema);
exports.default = testModel;
//# sourceMappingURL=Test.js.map