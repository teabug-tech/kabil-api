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
const DialectService_1 = __importDefault(require("../services/DialectService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const controller_1 = __importDefault(require("../shared/controller"));
exports.default = Object.assign(Object.assign({}, (0, controller_1.default)(UserService_1.default)), { createOne: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body.data;
            if (data.role)
                if (data.role != 'guest' && data.role != 'user')
                    return res.status(400).json({ success: false, message: 'wrong user role' });
            let dialect = yield DialectService_1.default.getOne({ name: data.name })()();
            if (!dialect)
                dialect = yield DialectService_1.default.createOne({ name: data.dialect })();
            data.dialect = dialect._id;
            const exec = UserService_1.default.createOne(data);
            const user = yield exec();
            res.status(201);
            req.body.user = { _id: user._id, role: user.role };
            next();
        }
        catch (e) {
            next(e);
        }
    }) });
//# sourceMappingURL=UserController.js.map