import { model, ObjectId, Schema, Types } from 'mongoose';
interface IDialect {
  _id?: ObjectId;
  name: string;
  user: Types.ObjectId;
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
