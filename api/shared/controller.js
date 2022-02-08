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
Object.defineProperty(exports, "__esModule", { value: true });
const getOne = (getOne) => (filter) => (arg) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = getOne(filter);
        const exec = select(arg);
        const doc = yield exec();
        return res.status(200).json({ success: true, message: doc });
    }
    catch (e) {
        next(e);
    }
});
const getOneAndPopulate = (getOneAndPopulate) => (filter) => (fieldsToPopulate) => (arg) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const populate = getOneAndPopulate(filter);
        const select = populate(fieldsToPopulate);
        const exec = select(arg);
        const doc = yield exec();
        return res.status(200).json({ success: true, message: doc });
    }
    catch (e) {
        next(e);
    }
});
const getMany = (getMany) => (filter) => (arg) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = getMany(filter);
        const exec = select(arg);
        const docs = yield exec();
        return res.status(200).json({ success: true, message: docs });
    }
    catch (e) {
        next(e);
    }
});
const getAll = (getAll) => (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield getAll();
        return res.status(200).json({ success: true, message: docs });
    }
    catch (e) {
        next(e);
    }
});
const createOne = (createOne) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const exec = createOne(data);
        const resu = yield exec();
        return res.status(201).json({ success: true, message: resu });
    }
    catch (e) {
        next(e);
    }
});
const updateOne = (updateOne) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body.filter;
        const data = req.body.data;
        let options = req.body.options;
        if (!options)
            options = { new: true };
        const insertData = updateOne(filter);
        const insertOptions = insertData(data);
        const exec = insertOptions(options);
        const updated = yield exec();
        if (!updated)
            return res.status(404).json({ success: false, message: 'Document not found' });
        return res.status(200).json({ success: true, message: updated });
    }
    catch (e) {
        next(e);
    }
});
const deleteOne = (deleteOne) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body.filter;
        const exec = deleteOne(filter);
        const deleted = yield exec();
        if (!deleted)
            return res.status(404).json({ success: false, message: 'Document not found' });
        return res.status(200).json({ success: true, message: deleted });
    }
    catch (e) {
        next(e);
    }
});
exports.default = (crud) => ({
    getOne: getOne(crud.getOne),
    getMany: getMany(crud.getMany),
    getAll: getAll(crud.getAll),
    createOne: createOne(crud.createOne),
    updateOne: updateOne(crud.updateOne),
    deleteOne: deleteOne(crud.deleteOne),
    getOneAndPopulate: getOneAndPopulate(crud.getOneAndPopulate),
});
//# sourceMappingURL=controller.js.map