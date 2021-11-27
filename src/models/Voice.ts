import { model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IVoice {
  _id?: ObjectId;
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

const voiceModel = model('voice', voiceSchema);

export { IVoice };
export default voiceModel;
