import { model, Schema } from 'mongoose';

const voiceSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export const voiceModel = model('voice', voiceSchema);
