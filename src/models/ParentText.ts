import { Condition, Model, model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import ArabicScriptService from '../services/ArabicScriptService';
import { IChildText } from './ChildText';
import { IDialect } from './Dialect';
import { IDomain } from './Domain';
import { IScript, latinScriptModel } from './Scripts';
import { IVoice } from './Voice';

interface IParentText {
  _id?: ObjectId;
  arabicScript?: PopulatedDoc<IScript>;
  latinScript?: PopulatedDoc<IScript>;
  voice?: PopulatedDoc<IVoice>;
  domain?: PopulatedDoc<IDomain>;
  dialect?: PopulatedDoc<IDialect>;
  gender?: 'male' | 'female';
  childTexts?: PopulatedDoc<Array<IChildText>>;
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

const validatRef = (model: Model<any>) => async (ref: Condition<ObjectId>) => await model.exists({ _id: ref });

const Refvalidator = (model: Model<any>) => async (value: Condition<ObjectId>) => {
  const validate = validatRef(model);
  return await validate(value);
};

// parentTextSchema.path('latinScript').validate(Refvalidator(latinScriptModel), 'invalid references');

parentTextSchema.post('findOneAndUpdate', async function (doc: IParentText) {
  if (doc.latinScript && doc.arabicScript && doc.voice && doc.gender && doc.dialect && doc.domain) {
    await parentTextModel.updateOne({ _id: doc._id }, { isCompleted: true }, { new: true });
  }
});

const parentTextModel = model('ParentText', parentTextSchema);

export { IParentText };
export default parentTextModel;
