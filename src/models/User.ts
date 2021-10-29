import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { IDialect } from './Dialect';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dialect: PopulatedDoc<IDialect>;
}

const userSchema = new Schema({
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
});

const userModel = model('user', userSchema);

export { IUser };
export default userModel;
