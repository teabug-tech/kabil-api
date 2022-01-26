import { AnyKeys, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

const getOne =
  <T>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (arg?: object | string | Array<string>) =>
  async () =>
    await model.findOne(filter).select(arg).lean().exec();

const getMany =
  <T>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (arg?: object | string | Array<string>) =>
  async () =>
    await model.find(filter).select(arg).lean().exec();

const getOneAndPopulate =
  <T>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (fieldsToPopulate: Array<string>) =>
  (arg?: object | string | Array<string>) =>
  async () => {
    let res = model.findOne(filter);
    fieldsToPopulate.forEach((v) => {
      res = res.populate(v);
    });
    return await res.select(arg).lean().exec();
  };

const getAll =
  <T>(model: Model<T>) =>
  async () =>
    await model.find({}).lean().exec();

const createOne =
  <T>(model: Model<T>) =>
  (data: AnyKeys<T>) =>
  async () =>
    await model.create(data);

const updateOne =
  <T>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  (data: UpdateQuery<T>) =>
  (options: QueryOptions = {}) =>
  async () =>
    await model.findOneAndUpdate(filter, data, options).lean().exec();

const deleteOne =
  <T>(model: Model<T>) =>
  (filter: FilterQuery<T>) =>
  async () =>
    await model.findOneAndDelete(filter).lean().exec();

export default <T>(model: Model<T>) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  getOneAndPopulate: getOneAndPopulate(model),
  getAll: getAll(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});
