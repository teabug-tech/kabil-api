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
const ParentText_1 = __importDefault(require("../models/ParentText"));
const ChildTextService_1 = __importDefault(require("../services/ChildTextService"));
const ParentTextService_1 = __importDefault(require("../services/ParentTextService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const controller_1 = __importDefault(require("../shared/controller"));
const helpers_1 = require("../shared/helpers");
const ChildTextController_1 = __importDefault(require("./ChildTextController"));
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const makeParentObject = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const parent = Object.assign({}, data);
    for (const key in data) {
        if (key in helpers_1.services) {
            const getId = (0, helpers_1.applyOp)(key);
            parent[key] = yield getId({ user, [key]: data[key] });
        }
    }
    return parent;
});
const validateParentData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const parentData = Object.assign({}, data);
    const parent = yield ParentTextService_1.default.getOne({ _id: id })()();
    for (const key in parentData) {
        if (key in parent) {
            throw new Error('Access denied');
        }
    }
});
exports.default = Object.assign(Object.assign({}, (0, controller_1.default)(ParentTextService_1.default)), { getCompleted: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const lookupObjects = (0, helpers_1.makeLookupObjects)(['arabicScript', 'latinScript', 'voice', 'domain', 'dialect']);
            const text = yield ParentText_1.default
                .aggregate([...lookupObjects])
                .match({ isCompleted: true })
                .sample(1)
                .exec();
            if (!text.length)
                return yield ChildTextController_1.default.getOne(req, res, next);
            res.send(text);
        }
        catch (e) {
            next(e);
        }
    }), getOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (getRandomInt(2))
                return res.send([{}]);
            const lookupObjects = (0, helpers_1.makeLookupObjects)(['arabicScript', 'latinScript', 'voice', 'domain', 'dialect']);
            const text = yield ParentText_1.default
                .aggregate([...lookupObjects])
                .match({ $and: [{ isCompleted: false }, { _id: { $nin: req.user.createdTexts } }] })
                .sample(1)
                .exec();
            if (!text.length)
                return yield ChildTextController_1.default.getSlice(req, res, next);
            res.send(text);
        }
        catch (e) {
            next(e);
        }
    }), createOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            if (req.file && req.file.filename != '')
                body.voice = req.file.buffer;
            const parent = yield makeParentObject(body, req.user._id);
            const exec = ParentTextService_1.default.createOne(parent);
            const result = yield exec();
            const insertData = UserService_1.default.updateOne({ _id: req.user._id });
            const insertOptions = insertData({ $push: { createdTexts: result._id } });
            const execUser = insertOptions();
            yield execUser();
            if (result.latinScript &&
                result.arabicScript &&
                result.voice &&
                result.gender &&
                result.dialect &&
                result.domain) {
                const exec = ChildTextService_1.default.createOne({
                    gender: result.gender,
                    dialect: result.dialect,
                    domain: result.domain,
                    voice: result.voice,
                    arabicScript: result.arabicScript,
                    latinScript: result.latinScript,
                    parent: result._id,
                });
                yield exec();
            }
            res.json({ success: true, message: result._id });
        }
        catch (e) {
            next(e);
        }
    }), updateOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const body = req.body;
            const id = body.id;
            if (req.file && req.file.filename != '')
                body.voice = req.file.path;
            yield validateParentData(body, id);
            const parent = yield makeParentObject(body, req.user._id);
            const result = yield ParentTextService_1.default.updateOne({ _id: id })(Object.assign({}, parent))({ new: true })();
            const insertData = UserService_1.default.updateOne({ _id: req.user._id });
            const insertOptions = insertData({ $push: { createdTexts: result._id } });
            const execUser = insertOptions({ new: true });
            yield execUser();
            if (result.latinScript &&
                result.arabicScript &&
                result.voice &&
                result.gender &&
                result.dialect &&
                result.domain) {
                const exec = ChildTextService_1.default.createOne({
                    gender: result.gender,
                    dialect: result.dialect,
                    domain: result.domain,
                    voice: result.voice,
                    arabicScript: result.arabicScript,
                    latinScript: result.latinScript,
                    parent: result._id,
                });
                yield exec();
            }
            res.send(result);
        }
        catch (e) {
            next(e);
        }
    }) });
//# sourceMappingURL=ParentTextController.js.map