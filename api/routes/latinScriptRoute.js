"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importStar(require("express"));
const LatinScriptController_1 = __importDefault(require("../controllers/LatinScriptController"));
const errorMiddleware_1 = __importDefault(require("../middlewares/errorMiddleware"));
dotenv.config();
let latinScriptRouter = (0, express_1.Router)();
if (process.env.NODE_ENV == 'test')
    latinScriptRouter = (0, express_1.default)();
latinScriptRouter.use(express_1.default.json());
latinScriptRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const select = LatinScriptController_1.default.getMany({ user: req.query.user });
    const exec = select('script user');
    return yield exec(req, res, next);
}));
latinScriptRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const select = LatinScriptController_1.default.getOne({ _id: req.params.id });
    const exec = select('script user');
    return yield exec(req, res, next);
}));
latinScriptRouter.get('/', LatinScriptController_1.default.getAll);
latinScriptRouter.post('/', LatinScriptController_1.default.createOne);
latinScriptRouter.delete('/', LatinScriptController_1.default.deleteOne);
latinScriptRouter.put('/', LatinScriptController_1.default.updateOne);
if (process.env.NODE_ENV == 'test')
    latinScriptRouter.use(errorMiddleware_1.default);
exports.default = latinScriptRouter;
//# sourceMappingURL=latinScriptRoute.js.map