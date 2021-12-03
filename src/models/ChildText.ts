import { model, ObjectId, Schema, Types } from 'mongoose';
interface IChildText {
  _id?: ObjectId;
  arabicScript?: Types.ObjectId;
  latinScript?: Types.ObjectId;
  voice?: Types.ObjectId;
  domain?: Types.ObjectId;
  dialect?: Types.ObjectId;
  gender?: 'male' | 'female';
  parent: Types.ObjectId;
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
