import { Model } from 'mongoose';
import childTextModel from '../models/ChildText';
import { ParentTextModel } from '../models/ParentText';

const getOne = (model: Model<ParentTextModel>) => (filter) => async () => {};
