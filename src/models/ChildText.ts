import { model, ObjectId, PopulatedDoc, Schema } from 'mongoose';
import { IDialect } from './Dialect';
import { IDomain } from './Domain';
import { IParentText } from './ParentText';
import { IScript } from './Scripts';
import { IVoice } from './Voice';

interface IChildText {
  _id?: ObjectId;
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
});

const childTextModel = model('ChildText', childTextSchema);

export { IChildText };
export default childTextModel;
