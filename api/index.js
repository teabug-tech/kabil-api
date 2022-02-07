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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db");
const dotenv = __importStar(require("dotenv"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const testRoute_1 = __importDefault(require("./routes/testRoute"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const googleAuthRoute_1 = __importDefault(require("./routes/googleAuthRoute"));
const facebookAuthRoute_1 = __importDefault(require("./routes/facebookAuthRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const parentTextRoute_1 = __importDefault(require("./routes/parentTextRoute"));
const childTextRoute_1 = __importDefault(require("./routes/childTextRoute"));
const cors_1 = __importDefault(require("cors"));
const validationRoute_1 = __importDefault(require("./routes/validationRoute"));
const path_1 = __importDefault(require("path"));
dotenv.config();
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.get('/', (req, res) => res.end(__dirname));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connect)();
        app.listen(process.env.PORT, () => {
            console.log(`Server up and running on port ${process.env.PORT} !`);
        });
    }
    catch (e) {
        console.error(e);
    }
});
app.use('/users', userRoute_1.default);
app.use('/auth', googleAuthRoute_1.default);
app.use('/auth', facebookAuthRoute_1.default);
app.use('/test', testRoute_1.default);
app.use('/auth', googleAuthRoute_1.default);
app.use(authMiddleware_1.userAuth);
app.use('/parent/texts', parentTextRoute_1.default);
app.use('/child/texts', childTextRoute_1.default);
app.use('/validations', validationRoute_1.default);
app.get('/hello', (req, res) => {
    return res.end('hello world');
});
app.use(errorMiddleware_1.default);
start();
//# sourceMappingURL=index.js.map