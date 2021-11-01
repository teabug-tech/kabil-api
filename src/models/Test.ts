import { Document, model, Schema } from 'mongoose';

interface ITest extends Document {
  name: string;
  age: number;
}

const testSchema = new Schema<ITest>({
  name: {
    type: String,
  },
  age: {
    unique: true,
    type: Number,
    min: 18,
  },
});

const testModel = model('test', testSchema);
export { ITest };
export default testModel;
