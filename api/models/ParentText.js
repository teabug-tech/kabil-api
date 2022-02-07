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
const mongoose_1 = require("mongoose");
const existValidator_1 = require("../shared/existValidator");
const Domain_1 = __importDefault(require("./Domain"));
const parentTextSchema = new mongoose_1.Schema({
    arabicScript: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'arabicScript',
    },
    latinScript: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'latinScript',
    },
    voice: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'voice',
    },
    domain: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'domain',
    },
    dialect: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'dialect',
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    childTexts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'childText',
        },
    ],
    isCompleted: {
        type: Boolean,
        default: false,
    },
});
parentTextSchema.path('domain').validate((0, existValidator_1.Refvalidator)(Domain_1.default), 'invalid references');
parentTextSchema.post('findOneAndUpdate', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc.latinScript && doc.arabicScript && doc.voice && doc.gender && doc.dialect && doc.domain) {
            yield parentTextModel.updateOne({ _id: doc._id }, { isCompleted: true }, { new: true });
        }
    });
});
parentTextSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.latinScript && this.arabicScript && this.voice && this.gender && this.dialect && this.domain) {
            this.isCompleted = true;
        }
        next();
    });
});
const parentTextModel = (0, mongoose_1.model)('ParentText', parentTextSchema);
exports.default = parentTextModel;
//# sourceMappingURL=ParentText.js.map