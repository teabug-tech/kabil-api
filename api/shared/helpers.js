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
exports.applyOp = exports.services = exports.makeLookupObjects = void 0;
const ArabicScriptService_1 = __importDefault(require("../services/ArabicScriptService"));
const DialectService_1 = __importDefault(require("../services/DialectService"));
const DomainService_1 = __importDefault(require("../services/DomainService"));
const LatinScriptService_1 = __importDefault(require("../services/LatinScriptService"));
const VoiceService_1 = __importDefault(require("../services/VoiceService"));
const makeLookupObjects = (lookups) => lookups.map((lookup) => ({
    $lookup: {
        from: lookup.toLowerCase() + 's',
        localField: lookup,
        foreignField: '_id',
        as: lookup,
    },
}));
exports.makeLookupObjects = makeLookupObjects;
exports.services = {
    latinScript: (data) => __awaiter(void 0, void 0, void 0, function* () { return yield LatinScriptService_1.default.createOne({ user: data.user, script: data.latinScript })(); }),
    arabicScript: (data) => __awaiter(void 0, void 0, void 0, function* () { return yield ArabicScriptService_1.default.createOne({ user: data.user, script: data.arabicScript })(); }),
    voice: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield VoiceService_1.default.createOne({ user: data.user, buffer: data.voice })();
    }),
    domain: (data) => __awaiter(void 0, void 0, void 0, function* () { return yield DomainService_1.default.createOne({ name: data.domain })(); }),
    dialect: (data) => __awaiter(void 0, void 0, void 0, function* () { return yield DialectService_1.default.createOne({ name: data.dialect })(); }),
};
const applyOp = (op) => (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.services[op](data);
    return res._id;
});
exports.applyOp = applyOp;
//# sourceMappingURL=helpers.js.map