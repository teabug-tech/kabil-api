import { model, Schema } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import { IValidation } from '../types';
import childTextModel from './ChildText';

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

validationSchema.path('childText').validate(Refvalidator(childTextModel), 'invalid references');

const validationModel = model('validation', validationSchema);

export default validationModel;
