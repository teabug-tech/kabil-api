import { model, Schema, Types } from 'mongoose';

interface IScript {
  _id?: Types.ObjectId;
  script: string;
  user: Types.ObjectId;
}

const scriptSchema = new Schema<IScript>({
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
export { IScript };
