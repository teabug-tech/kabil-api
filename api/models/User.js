"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const existValidator_1 = require("../shared/existValidator");
const Dialect_1 = __importDefault(require("./Dialect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    age: {
        type: Number,
        required: true,
    },
    dialect: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'dialect',
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user', 'guest'],
    },
    password: {
        type: String,
        required: true,
    },
    validatedTexts: [
        {
            ref: 'childText',
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    createdTexts: [
        {
            ref: 'parentText',
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
});
userSchema.path('dialect').validate((0, existValidator_1.Refvalidator)(Dialect_1.default), 'invalid references');
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt_1.default.hash(this.password, 10, (err, passwordHash) => {
        if (err) {
            return next(err);
        }
        this.password = passwordHash;
        return next();
    });
});
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
//# sourceMappingURL=User.js.map