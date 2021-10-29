import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IVoice extends Document {
  url: string;
  user: PopulatedDoc<IUser>;
}

const voiceSchema = new Schema<IVoice>({
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

export { IVoice };
export default model('voice', voiceSchema);
