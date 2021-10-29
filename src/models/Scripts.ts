import { model, Schema } from 'mongoose';

const scriptSchema = new Schema({
  script: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export const latinScriptModel = model('latinScript', scriptSchema);
export const arabicScriptModel = model('arabicScript', scriptSchema);
