import { model, Schema } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import { IVoice } from '../types';
import userModel from './User';

const voiceSchema = new Schema<IVoice>({
  buffer: {
    type: Schema.Types.Buffer,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const voiceModel = model('voice', voiceSchema);

voiceSchema.path('user').validate(Refvalidator(userModel), 'invalid references');

export default voiceModel;
