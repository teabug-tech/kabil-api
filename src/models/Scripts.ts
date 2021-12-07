import { model, Schema } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import { IScript } from '../types';
import userModel from './User';

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
