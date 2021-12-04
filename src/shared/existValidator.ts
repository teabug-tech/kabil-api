import { FilterQuery, Model, Types } from 'mongoose';

const validatRef =
  <T>(model: Model<T>) =>
  async (ref: Types.ObjectId) =>
    await model.exists({ _id: ref } as FilterQuery<T>);

export const Refvalidator =
  <T>(model: Model<T>) =>
  async (value: Types.ObjectId) => {
    const validate = validatRef(model);
    return await validate(value);
  };
