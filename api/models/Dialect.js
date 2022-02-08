"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dialectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
const dialectModel = (0, mongoose_1.model)('dialect', dialectSchema);
exports.default = dialectModel;
//# sourceMappingURL=Dialect.js.map