import { Model, model, Schema, Types } from 'mongoose';
import ParentTextService from '../services/ParentTextService';
import { Refvalidator } from '../shared/existValidator';
import domainModel, { IDomain } from './Domain';

interface IParentText {
  _id?: Types.ObjectId;
  arabicScript?: Types.ObjectId;
  latinScript?: Types.ObjectId;
  voice?: Types.ObjectId;
  domain?: Types.ObjectId;
  dialect?: Types.ObjectId;
  gender?: 'male' | 'female';
  childTexts?: [Types.ObjectId];
  isCompleted?: true | false;
}

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
    await ParentTextService.updateOne({ _id: doc._id })({ isCompleted: true })({ new: true })();
  }
});

parentTextSchema.post('save', async function (doc: IParentText) {
  console.log('hey');
  if (doc.latinScript && doc.arabicScript && doc.voice && doc.gender && doc.dialect && doc.domain) {
    await ParentTextService.updateOne({ _id: doc._id })({ isCompleted: true })({ new: true })();
  }
});

const parentTextModel = model('ParentText', parentTextSchema);

export { IParentText };
export default parentTextModel;
