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
exports.userAuth = exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv.config();
const adminAuth = (req, res, next) => {
    try {
        let token;
        if (Object.prototype.hasOwnProperty.call(req, 'cookies'))
            token = req.cookies['JWT'];
        if (!token) {
            token = req.headers['authorization'].split(' ')[1];
        }
        const { role } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (role != 'admin')
            throw new Error('not allowed');
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.adminAuth = adminAuth;
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let token;
        if (Object.prototype.hasOwnProperty.call(req, 'cookies'))
            token = req.cookies['JWT'];
        if (!token) {
            token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        }
        if (!token)
            token = req.headers['jwt'];
        if (!token)
            throw new Error('not allowed');
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(user);
        if (user.role != 'user' && user.role != 'guest')
            throw new Error('not allowed');
        req.user = yield User_1.default.findById(user._id);
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.userAuth = userAuth;
//# sourceMappingURL=authMiddleware.js.map