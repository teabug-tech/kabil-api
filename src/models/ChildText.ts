import { model, Schema } from 'mongoose';

const ChildTextSchema = new Schema({
  arabicScipt: {
    type: Schema.Types.ObjectId,
    ref: 'ArabicScript',
  },
});

const ChildTextModel = model('ChildText', ChildTextSchema);

export default ChildTextModel;
