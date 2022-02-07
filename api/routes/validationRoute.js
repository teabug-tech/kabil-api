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
const express_1 = require("express");
const ChildText_1 = __importDefault(require("../models/ChildText"));
const Validation_1 = __importDefault(require("../models/Validation"));
const UserService_1 = __importDefault(require("../services/UserService"));
const validationRouter = (0, express_1.Router)();
validationRouter.get('/', (req, res) => {
    res.end('hello world!');
});
validationRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        if (!(yield ChildText_1.default.findById(data.text)))
            res.status(404).json({ success: false, message: 'text does not exist' });
        const doc = yield Validation_1.default
            .findOneAndUpdate({ text: data.text }, { $push: { answers: data.answer } }, { upsert: true, new: true })
            .select('text');
        const insertData = UserService_1.default.updateOne({ _id: req.user._id });
        const insertOptions = insertData({ $push: { validatedTexts: data.text } });
        const exec = insertOptions();
        yield exec();
        return res.json({ success: true, message: doc });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = validationRouter;
//# sourceMappingURL=validationRoute.js.map