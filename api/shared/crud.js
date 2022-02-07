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
const getOne = (model) => (filter) => (arg) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.findOne(filter).select(arg).lean().exec(); });
const getMany = (model) => (filter) => (arg) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.find(filter).select(arg).lean().exec(); });
const getOneAndPopulate = (model) => (filter) => (fieldsToPopulate) => (arg) => () => __awaiter(void 0, void 0, void 0, function* () {
    let res = model.findOne(filter);
    fieldsToPopulate.forEach((v) => {
        res = res.populate(v);
    });
    return yield res.select(arg).lean().exec();
});
const getAll = (model) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.find({}).lean().exec(); });
const createOne = (model) => (data) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.create(data); });
const updateOne = (model) => (filter) => (data) => (options = {}) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.findOneAndUpdate(filter, data, options).lean().exec(); });
const deleteOne = (model) => (filter) => () => __awaiter(void 0, void 0, void 0, function* () { return yield model.findOneAndDelete(filter).lean().exec(); });
exports.default = (model) => ({
    getOne: getOne(model),
    getMany: getMany(model),
    getOneAndPopulate: getOneAndPopulate(model),
    getAll: getAll(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
});
//# sourceMappingURL=crud.js.map