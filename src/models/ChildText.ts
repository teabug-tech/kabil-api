import { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { IDialect } from './Dialect';
import { IDomain } from './Domain';
import { IParentText } from './ParentText';
import { IScript } from './Scripts';
import { IVoice } from './Voice';

interface IChildText extends Document {
  arabicScript?: PopulatedDoc<IScript>;
  latinScript?: PopulatedDoc<IScript>;
  voice?: PopulatedDoc<IVoice>;
  domain?: PopulatedDoc<IDomain>;
  dialect?: PopulatedDoc<IDialect>;
  gender?: 'male' | 'female';
  parent: PopulatedDoc<IParentText>;
}

const childTextSchema = new Schema<IChildText>({
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
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'parentText',
    required: true,
  },
});

const childTextModel = model('ChildText', childTextSchema);

export { IChildText };
export default childTextModel;
