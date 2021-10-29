import { model, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IScript {
  script: string;
  user: PopulatedDoc<IUser>;
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
