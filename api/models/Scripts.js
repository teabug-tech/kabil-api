"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arabicScriptModel = exports.latinScriptModel = void 0;
const mongoose_1 = require("mongoose");
const existValidator_1 = require("../shared/existValidator");
const User_1 = __importDefault(require("./User"));
const scriptSchema = new mongoose_1.Schema({
    script: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});
scriptSchema.path('user').validate((0, existValidator_1.Refvalidator)(User_1.default), 'invalid references');
exports.latinScriptModel = (0, mongoose_1.model)('latinScript', scriptSchema);
exports.arabicScriptModel = (0, mongoose_1.model)('arabicScript', scriptSchema);
//# sourceMappingURL=Scripts.js.map