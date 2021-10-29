import { model, Schema } from 'mongoose';

const dialectSchema = new Schema({
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

export default dialectModel;
