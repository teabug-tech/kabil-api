"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const mongoose_1 = require("mongoose");
const ParentTextService_1 = __importDefault(require("../services/ParentTextService"));
const existValidator_1 = require("../shared/existValidator");
const Domain_1 = __importDefault(require("./Domain"));
const ParentText_1 = __importDefault(require("./ParentText"));
const Scripts_1 = require("./Scripts");
const Voice_1 = __importDefault(require("./Voice"));
const childTextSchema = new mongoose_1.Schema({
    arabicScript: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'arabicScript',
        required: true,
    },
    latinScript: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'latinScript',
        required: true,
    },
    voice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'voice',
        required: true,
    },
    domain: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'domain',
        required: true,
    },
    dialect: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'dialect',
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'parentText',
        required: true,
    },
    validatedBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    ],
});
childTextSchema.path('arabicScript').validate((0, existValidator_1.Refvalidator)(Scripts_1.arabicScriptModel), 'Invalid Reference!');
childTextSchema.path('latinScript').validate((0, existValidator_1.Refvalidator)(Scripts_1.latinScriptModel), 'Invalid Reference!');
childTextSchema.path('voice').validate((0, existValidator_1.Refvalidator)(Voice_1.default), 'Invalid Reference!');
childTextSchema.path('domain').validate((0, existValidator_1.Refvalidator)(Domain_1.default), 'Invalid Reference!');
childTextSchema.path('parent').validate((0, existValidator_1.Refvalidator)(ParentText_1.default), 'Invalid Reference!');
childTextSchema.post('save', function (child) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertData = ParentTextService_1.default.updateOne({ _id: child.parent._id });
        const insertOptions = insertData({ $push: { childTexts: child._id } });
        const exec = insertOptions({ new: true });
        yield exec();
    });
});
childTextSchema.pre('save', function (next) {
    if (this.validatedBy.length == 0)
        this.validatedBy.push(new bson_1.ObjectId());
    next();
});
const childTextModel = (0, mongoose_1.model)('ChildText', childTextSchema);
exports.default = childTextModel;
//# sourceMappingURL=ChildText.js.map