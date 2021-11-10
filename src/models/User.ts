import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { IDialect } from './Dialect';

export interface IUserObject {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dialect: PopulatedDoc<IDialect>;
  score: number;
  role: 'guest' | 'admin' | 'user';
  password?: string;
}

interface IUser extends Document, IUserObject {}

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
    default: 'guest',
    enum: ['guest', 'admin', 'user'],
  },
  password: String,
});

const userModel = model('user', userSchema);

export { IUser };
export default userModel;
