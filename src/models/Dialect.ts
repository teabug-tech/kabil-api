import { model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IDialect {
  _id?: ObjectId;
  name: string;
  user: PopulatedDoc<IUser>;
}

const dialectSchema = new Schema<IDialect>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const dialectModel = model('dialect', dialectSchema);

export { IDialect };
export default dialectModel;
