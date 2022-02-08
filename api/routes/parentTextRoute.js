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
const ParentTextController_1 = __importDefault(require("../controllers/ParentTextController"));
const dotenv = __importStar(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.mp3');
    },
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
});
const upload = (0, multer_1.default)({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != 'audio/mp3' && file.mimetype != 'audio/mpeg')
            return cb(new Error('Something went wrong'));
        cb(null, true);
    },
    storage: storage,
});
dotenv.config();
let ParentTextRouter = (0, express_1.Router)();
if (process.env.NODE_ENV == 'test')
    ParentTextRouter = (0, express_1.default)();
ParentTextRouter.post('/', upload.single('audio'), ParentTextController_1.default.createOne);
ParentTextRouter.put('/', upload.single('audio'), ParentTextController_1.default.updateOne);
ParentTextRouter.get('/completed', ParentTextController_1.default.getCompleted);
ParentTextRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ParentTextController_1.default.getOneAndPopulate({ _id: req.params.id })([
        'arabicScript',
        'latinScript',
        'dialect',
        'voice',
        'domain',
    ])()(req, res, next);
}));
ParentTextRouter.get('/', ParentTextController_1.default.getOne);
exports.default = ParentTextRouter;
//# sourceMappingURL=parentTextRoute.js.map