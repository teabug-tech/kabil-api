import { model, Schema } from 'mongoose';
import ChildTextService from '../services/ChildTextService';
import { Refvalidator } from '../shared/existValidator';
import { IValidation } from '../types';
import childTextModel from './ChildText';

const validationSchema = new Schema<IValidation>({
  text: {
    type: Schema.Types.ObjectId,
    ref: 'childText',
  },
  answers: [
    {
      type: String,
      enum: ['yes', 'no'],
      required: true,
    },
  ],
});

validationSchema.path('text').validate(Refvalidator(childTextModel), 'invalid references');

const validationModel = model('validation', validationSchema);

export default validationModel;
