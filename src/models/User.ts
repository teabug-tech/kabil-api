import { model, Schema, Types } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import dialectModel from './Dialect';
export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dialect: Types.ObjectId;
  score: number;
  role: 'guest' | 'admin' | 'user';
  password?: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  age: {
    type: Number,
    required: true,
  },
  dialect: {
    type: Schema.Types.ObjectId,
    ref: 'dialect',
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.path('dialect').validate(Refvalidator(dialectModel), 'invalid references');

const userModel = model<IUser>('user', userSchema);

export default userModel;
