import { Request } from 'express';
import { FilterQuery, Types } from 'mongoose';

export interface IRequest extends Request {
  user: IUser;
}

export interface IChildData {
  _id?: Types.ObjectId;
  arabicScript?: Types.ObjectId;
  latinScript?: Types.ObjectId;
  voice?: Types.ObjectId;
  domain?: Types.ObjectId;
  dialect?: Types.ObjectId;
  gender?: 'male' | 'female';
  parent?: Types.ObjectId;
}

export interface IChildText {
  _id?: Types.ObjectId;
  arabicScript: Types.ObjectId;
  latinScript: Types.ObjectId;
  voice: Types.ObjectId;
  domain: Types.ObjectId;
  dialect: Types.ObjectId;
  gender: 'male' | 'female';
  parent: Types.ObjectId;
  validatedBy: [Types.ObjectId];
}
export interface IDialect {
  _id?: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
}

export interface IDomain {
  _id?: Types.ObjectId;
  name: string;
  user: Types.ObjectId;
}

export interface IParentText {
  _id?: Types.ObjectId;
  arabicScript?: Types.ObjectId;
  latinScript?: Types.ObjectId;
  voice?: Types.ObjectId;
  domain?: Types.ObjectId;
  dialect?: Types.ObjectId;
  gender?: 'male' | 'female';
  childTexts?: [Types.ObjectId];
  isCompleted?: true | false;
}

export interface IScript {
  _id?: Types.ObjectId;
  script: string;
  user: Types.ObjectId;
}

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dialect: Types.ObjectId;
  score: number;
  role: 'guest' | 'admin' | 'user';
  password?: string;
}
export interface IValidation {
  _id?: Types.ObjectId;
  text: Types.ObjectId;
  answers: ['yes' | 'no'];
}
export interface IVoice {
  _id?: Types.ObjectId;
  url: string;
  user: Types.ObjectId;
}

type Filter<T> = FilterQuery<T>;

export type Arg = string | object | string[];
export type GetOneFn<T, U> = (filter: Filter<T>) => (arg?: Arg) => () => Promise<U>;
export type GetManyFn<T, U> = (filter: Filter<T>) => (arg?: Arg) => () => Promise<U[]>;
export type GetAllFn<U> = () => Promise<U[]>;
export type CreateOneFn<U> = (data: object) => () => Promise<U>;
export type UpdateOneFn<T, U> = (filter: Filter<T>) => (data: object) => (options?: object) => () => Promise<U>;
export type DeleteOneFn<T, U> = (filter: Filter<T>) => () => Promise<U>;
export type GetOneAndPopulateFn<T, U> = (
  filter: Filter<T>,
) => (fieldsToPopulate: Array<string>) => (arg?: Arg) => () => Promise<U>;

export interface Lookup {
  $lookup: {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  };
}
export interface crud<T, U> {
  getOne: GetOneFn<T, U>;
  getMany: GetManyFn<T, U>;
  getAll: GetAllFn<U>;
  createOne: CreateOneFn<U>;
  updateOne: UpdateOneFn<T, U>;
  deleteOne: DeleteOneFn<T, U>;
  getOneAndPopulate: GetOneAndPopulateFn<T, U>;
}

export type Refs = IScript | IVoice | IDomain | IDialect;
