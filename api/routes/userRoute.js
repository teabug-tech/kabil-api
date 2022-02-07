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
const express_1 = __importStar(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const errorMiddleware_1 = __importDefault(require("../middlewares/errorMiddleware"));
const dotenv = __importStar(require("dotenv"));
const AuthController_1 = __importStar(require("../controllers/AuthController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
dotenv.config();
let userRouter = (0, express_1.Router)();
if (process.env.NODE_ENV == 'test') {
    userRouter = (0, express_1.default)();
    userRouter.use(express_1.default.json());
}
userRouter.post('/login', AuthController_1.login);
userRouter.post('/', UserController_1.default.createOne);
userRouter.delete('/', authMiddleware_1.adminAuth, UserController_1.default.deleteOne);
userRouter.get('/', authMiddleware_1.adminAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const select = UserController_1.default.getMany(Object.assign({}, req.query));
    const exec = select('firstName lastName score');
    return yield exec(req, res, next);
}));
userRouter.get('/:id', authMiddleware_1.userAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user._id.toString() !== req.params.id)
            throw new Error('Invalid request');
        const select = UserController_1.default.getOne({ _id: req.params.id });
        const exec = select('firstName lastName score');
        return yield exec(req, res, next);
    }
    catch (e) {
        next(e);
    }
}));
userRouter.put('/', authMiddleware_1.userAuth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (req.body.filter.id != req.user._id) throw new Error('Invalid request');
        return yield UserController_1.default.updateOne(req, res, next);
    }
    catch (e) {
        next(e);
    }
}));
if (process.env.NODE_ENV == 'test')
    userRouter.use(errorMiddleware_1.default);
userRouter.use(AuthController_1.default);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map