import { model, PopulatedDoc, Schema } from 'mongoose';
import { IUser } from './User';

interface IDomain {
  name: string;
  user: PopulatedDoc<IUser>;
}

const domainSchema = new Schema<IDomain>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const domainModel = model('domain', domainSchema);

export { IDomain };
export default domainModel;
