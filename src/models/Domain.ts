import { model, Schema } from 'mongoose';
import { IDomain } from '../types';

const domainSchema = new Schema<IDomain>({
  name: {
    type: String,
    required: true,
  },
});

const domainModel = model('domain', domainSchema);

export default domainModel;
