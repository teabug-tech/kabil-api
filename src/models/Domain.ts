import { model, ObjectId, Schema, Types } from 'mongoose';
interface IDomain {
  _id?: ObjectId;
  name: string;
  user: Types.ObjectId;
}

const domainSchema = new Schema<IDomain>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const domainModel = model('domain', domainSchema);

export { IDomain };
export default domainModel;
