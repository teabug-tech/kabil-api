import { ObjectId } from 'bson';
import { model, Schema } from 'mongoose';
import ParentTextService from '../services/ParentTextService';
import { Refvalidator } from '../shared/existValidator';
import { IChildText } from '../types';
import domainModel from './Domain';
import parentTextModel from './ParentText';
import { arabicScriptModel, latinScriptModel } from './Scripts';
import voiceModel from './Voice';

const childTextSchema = new Schema<IChildText>({
  arabicScript: {
    type: Schema.Types.ObjectId,
    ref: 'arabicScript',
    required: true,
  },
  latinScript: {
    type: Schema.Types.ObjectId,
    ref: 'latinScript',
    required: true,
  },
  voice: {
    type: Schema.Types.ObjectId,
    ref: 'voice',
    required: true,
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'domain',
    required: true,
  },
  dialect: {
    type: Schema.Types.ObjectId,
    ref: 'dialect',
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'parentText',
    required: true,
  },
  validatedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  ],
});

childTextSchema.path('arabicScript').validate(Refvalidator(arabicScriptModel), 'Invalid Reference!');
childTextSchema.path('latinScript').validate(Refvalidator(latinScriptModel), 'Invalid Reference!');
childTextSchema.path('voice').validate(Refvalidator(voiceModel), 'Invalid Reference!');
childTextSchema.path('domain').validate(Refvalidator(domainModel), 'Invalid Reference!');
childTextSchema.path('parent').validate(Refvalidator(parentTextModel), 'Invalid Reference!');

childTextSchema.post('save', async function (child: IChildText) {
  const insertData = ParentTextService.updateOne({ _id: child.parent._id });
  const insertOptions = insertData({ $push: { childTexts: child._id } });
  const exec = insertOptions({ new: true });
  console.log(await exec());
});

childTextSchema.pre('save', function (next) {
  if (this.validatedBy.length == 0) this.validatedBy.push(new ObjectId());
  next();
});
const childTextModel = model('ChildText', childTextSchema);

export default childTextModel;
