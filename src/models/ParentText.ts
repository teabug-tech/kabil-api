import { model, PopulatedDoc, Schema } from 'mongoose';
import { IChildText } from './ChildText';
import { IDialect } from './Dialect';
import { IDomain } from './Domain';
import { IScript } from './Scripts';
import { IVoice } from './Voice';

interface IParentText {
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

const parentTextModel = model('ChildText', parentTextSchema);

export { IParentText };
export default parentTextModel;
