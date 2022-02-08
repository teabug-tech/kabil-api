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
const ChildText_1 = __importDefault(require("../models/ChildText"));
const ChildTextService_1 = __importDefault(require("../services/ChildTextService"));
const ParentTextService_1 = __importDefault(require("../services/ParentTextService"));
const controller_1 = __importDefault(require("../shared/controller"));
const helpers_1 = require("../shared/helpers");
const UserService_1 = __importDefault(require("../services/UserService"));
const getRandomFields = (keys, fieldsCount) => keys.sort(() => 0.5 - Math.random()).slice(0, fieldsCount);
const makeParentObject = (parent, fieldsToInclude) => {
    const fields = ['arabicScript', 'latinScript', 'voice'];
    const newParent = {};
    for (const key in parent) {
        if (fields.includes(key)) {
            if (fieldsToInclude.includes(key)) {
                newParent[key] = parent[key];
            }
        }
        else {
            newParent[key] = parent[key];
        }
    }
    return newParent;
};
const makeChildObject = (childData, parent, user) => __awaiter(void 0, void 0, void 0, function* () {
    const child = Object.assign({}, childData);
    for (const key in parent) {
        if (!(key in childData)) {
            child[key] = parent[key];
        }
        else {
            const getId = (0, helpers_1.applyOp)(key);
            child[key] = yield getId({ user, [key]: child[key] });
        }
    }
    return child;
});
exports.default = Object.assign(Object.assign({}, (0, controller_1.default)(ChildTextService_1.default)), { createOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (req.file && req.file.filename != '')
                body.voice = `http://localhost:4444/uploads/${req.file.filename}`;
            const childData = body;
            const parentId = childData.parent;
            const parent = yield ParentTextService_1.default.getOne({ _id: parentId })('-_id -childTexts')();
            const child = yield makeChildObject(childData, parent, req.user._id);
            const exec = ChildTextService_1.default.createOne(child);
            const createdChild = yield exec();
            const insertData = UserService_1.default.updateOne({ _id: req.user._id });
            const insertOptions = insertData({ $push: { createdTexts: createdChild.parent } });
            const execUser = insertOptions({ new: true });
            yield execUser();
            return res.send(createdChild);
        }
        catch (e) {
            next(e);
        }
    }), getSlice: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const lookupObjects = (0, helpers_1.makeLookupObjects)(['arabicScript', 'latinScript', 'domain', 'voice', 'dialect']);
            const text = yield ChildText_1.default
                .aggregate([...lookupObjects])
                .match({ parent: { $nin: req.user.createdTexts } })
                .sample(1)
                .exec();
            const fields = getRandomFields(['arabicScript', 'latinScript', 'voice'], Math.floor((Math.random() + 0.5) * 2));
            const parent = makeParentObject(text[0], fields);
            return res.send([parent]);
        }
        catch (e) {
            next(e);
        }
    }), getOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.user);
            const lookupObjects = (0, helpers_1.makeLookupObjects)(['arabicScript', 'latinScript', 'domain', 'voice', 'dialect']);
            const text = yield ChildText_1.default
                .aggregate([...lookupObjects])
                .match({ $and: [{ parent: { $nin: req.user.createdTexts } }, { _id: { $nin: req.user.validatedTexts } }] })
                .sample(1)
                .exec();
            res.send(text);
        }
        catch (e) {
            next(e);
        }
    }) });
//# sourceMappingURL=ChildTextController.js.map