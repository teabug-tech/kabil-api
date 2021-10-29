import { model, Schema } from 'mongoose';

const domainSchema = new Schema({
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

const domainModel = model('domain', domainSchema);

export default domainModel;
