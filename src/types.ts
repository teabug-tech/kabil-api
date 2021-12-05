import { Request } from 'express';
import { IUser } from './models/User';
import { Types } from 'mongoose';

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
