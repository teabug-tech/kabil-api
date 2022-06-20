"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChildTextController_1 = __importDefault(require("../controllers/ChildTextController"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    fileFilter: function (req, file, cb) {
        if (file.mimetype != 'audio/mp3' && file.mimetype != 'audio/mpeg')
            return cb(new Error('Something went wrong'));
        cb(null, true);
    },
    storage: storage,
});
const childTextRouter = (0, express_1.Router)();
childTextRouter.get('/', ChildTextController_1.default.getOne);
// childTextRouter.get('/', ChildTextController.getAll);
childTextRouter
    .route('/')
    .post(upload.single('audio'), ChildTextController_1.default.createOne)
    .delete(ChildTextController_1.default.deleteOne);
exports.default = childTextRouter;
//# sourceMappingURL=childTextRoute.js.map