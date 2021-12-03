import { model, Schema, Types } from 'mongoose';
interface IVoice {
  _id?: Types.ObjectId;
  url: string;
  user: Types.ObjectId;
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
