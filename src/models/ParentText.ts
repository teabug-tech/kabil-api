import { model, Schema } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import { IParentText } from '../types';
import ChildTextService from '../services/ChildTextService';
import domainModel from './Domain';
import childTextModel from './ChildText';

const parentTextSchema = new Schema<IParentText>({
  arabicScript: {
    type: Schema.Types.ObjectId,
    ref: 'arabicScript',
  },
  latinScript: {
    type: Schema.Types.ObjectId,
    ref: 'latinScript',
  },
  voice: {
    type: Schema.Types.ObjectId,
    ref: 'voice',
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'domain',
  },
  dialect: {
    type: Schema.Types.ObjectId,
    ref: 'dialect',
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  childTexts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'childText',
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

parentTextSchema.path('domain').validate(Refvalidator(domainModel), 'invalid references');

parentTextSchema.post('findOneAndUpdate', async function (doc: IParentText) {
  if (doc.latinScript && doc.arabicScript && doc.voice && doc.gender && doc.dialect && doc.domain) {
    await parentTextModel.updateOne({ _id: doc._id }, { isCompleted: true }, { new: true });
  }
});

parentTextSchema.pre('save', async function (next) {
  if (this.latinScript && this.arabicScript && this.voice && this.gender && this.dialect && this.domain) {
    this.isCompleted = true;
  }
  next();
});

const parentTextModel = model('ParentText', parentTextSchema);

export default parentTextModel;
