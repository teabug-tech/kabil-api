import { model, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IDialect {
  name: string;
  user: PopulatedDoc<IUser>;
}

const dialectSchema = new Schema<IDialect>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const dialectModel = model('dialect', dialectSchema);

export { IDialect };
export default dialectModel;
