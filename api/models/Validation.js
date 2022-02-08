"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const existValidator_1 = require("../shared/existValidator");
const ChildText_1 = __importDefault(require("./ChildText"));
const validationSchema = new mongoose_1.Schema({
    text: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'childText',
    },
    answers: [
        {
            type: String,
            enum: ['yes', 'no'],
            required: true,
        },
    ],
});
validationSchema.path('text').validate((0, existValidator_1.Refvalidator)(ChildText_1.default), 'invalid references');
const validationModel = (0, mongoose_1.model)('validation', validationSchema);
exports.default = validationModel;
//# sourceMappingURL=Validation.js.map