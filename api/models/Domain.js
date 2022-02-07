"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const domainSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
const domainModel = (0, mongoose_1.model)('domain', domainSchema);
exports.default = domainModel;
//# sourceMappingURL=Domain.js.map