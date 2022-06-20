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
const DialectService_1 = __importDefault(require("../services/DialectService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const guestRouter = (0, express_1.Router)();
const createGuest = () => __awaiter(void 0, void 0, void 0, function* () {
    const guest = {
        email: `${Date.now()}@guest.com`,
        firstName: 'guest',
        lastName: 'guest',
        gender: 'male',
        age: 18,
        role: 'guest',
        password: Date.now(),
        dialect: 'guest',
    };
    const dialect = yield DialectService_1.default.createOne({ name: 'guest' })();
    guest.dialect = dialect._id;
    const exec = UserService_1.default.createOne(guest);
    const createdGuest = yield exec();
    return createdGuest;
});
guestRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guest = yield createGuest();
        const tokenGuest = { _id: guest._id, role: guest.role };
        const token = jsonwebtoken_1.default.sign(Object.assign({}, tokenGuest), process.env.JWT_SECRET);
        res.cookie('JWT', token, { sameSite: 'none', secure: false });
        return res.json({ success: true, message: token });
    }
    catch (e) {
        next(e);
    }
}));
exports.default = guestRouter;
//# sourceMappingURL=guestRoute.js.map