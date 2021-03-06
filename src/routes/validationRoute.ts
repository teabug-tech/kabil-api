import { Router } from 'express';
import childTextModel from '../models/ChildText';
import validationModel from '../models/Validation';
import ChildTextService from '../services/ChildTextService';
import UserService from '../services/UserService';
import { IRequest } from '../types';

const validationRouter = Router();

validationRouter.get('/', (req, res) => {
  res.end('hello world!');
});
validationRouter.post('/', async (req: IRequest, res, next) => {
  try {
    const data = req.body.data;
    if (!(await childTextModel.findById(data.text)))
      res.status(404).json({ success: false, message: 'text does not exist' });
    const doc = await validationModel
      .findOneAndUpdate({ text: data.text }, { $push: { answers: data.answer } }, { upsert: true, new: true })
      .select('text');
    const insertData = UserService.updateOne({ _id: req.user._id });
    const insertOptions = insertData({ $push: { validatedTexts: data.text } });
    const exec = insertOptions();
    await exec();
    return res.json({ success: true, message: doc });
  } catch (e) {
    next(e);
  }
});

export default validationRouter;
