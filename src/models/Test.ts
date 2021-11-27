import { model, Schema } from 'mongoose';

interface ITest {
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
