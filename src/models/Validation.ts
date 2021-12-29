import { model, Schema } from 'mongoose';
import { IValidation } from '../types';

const validationSchema = new Schema<IValidation>({
  text: {
    ref: 'childText',
    required: true,
  },
  answer: {
    enum: ['yes', 'no'],
    required: true,
  },
});

const validationModel = model('validation', validationSchema);

export default validationModel;
