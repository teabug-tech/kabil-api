import { model, Schema } from 'mongoose';
import { IDialect } from '../types';

const dialectSchema = new Schema<IDialect>({
  name: {
    type: String,
    required: true,
  },
});

const dialectModel = model('dialect', dialectSchema);

export { IDialect };
export default dialectModel;
