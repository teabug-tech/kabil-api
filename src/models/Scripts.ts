import { model, Schema, Types } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import userModel from './User';

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

scriptSchema.path('user').validate(Refvalidator(userModel), 'invalid references');

export const latinScriptModel = model('latinScript', scriptSchema);
export const arabicScriptModel = model('arabicScript', scriptSchema);
export { IScript };
