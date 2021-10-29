import { model, Schema } from 'mongoose';

const childTextSchema = new Schema({
  arabicScipt: {
    type: Schema.Types.ObjectId,
    ref: 'arabicScript',
  },
  latinScript: {
    type: Schema.Types.ObjectId,
    ref: 'latinScript',
  },
  voice: {
    type: Schema.Types.ObjectId,
    ref: 'voice',
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'domain',
  },
  dialect: {
    type: Schema.Types.ObjectId,
    ref: 'dialect',
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'parentText',
  },
});

const childTextModel = model('ChildText', childTextSchema);

export default childTextModel;
