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
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const UserService_1 = __importDefault(require("../services/UserService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv.config();
exports.default = (req, res, next) => {
    try {
        console.log(req.body.user);
        const token = jsonwebtoken_1.default.sign(Object.assign({}, req.body.user), process.env.JWT_SECRET);
        res.cookie('JWT', token, { sameSite: 'none', secure: false });
        return res.json({ success: true, message: req.body.user });
    }
    catch (e) {
        next(e);
    }
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const userDoc = yield UserService_1.default.getOneAndPopulate({ email: user.email })(['dialect'])()();
        if (!userDoc)
            throw new Error('invalid credentials!');
        if (!bcrypt_1.default.compareSync(user.password, userDoc.password))
            throw new Error('invalid credentials');
        const token = jsonwebtoken_1.default.sign(Object.assign({}, userDoc), process.env.JWT_SECRET);
        res.cookie('JWT', token, { sameSite: 'none', secure: false });
        return res.json({ success: true, message: { user: userDoc, token } });
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
//# sourceMappingURL=AuthController.js.map