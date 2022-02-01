import { Router } from 'express';
import ValidationController from '../controllers/ValidationController';
import childTextModel from '../models/ChildText';
import validationModel from '../models/Validation';

const validationRouter = Router();

validationRouter.get('/', (req, res) => {
  res.end('hello world!');
});
validationRouter.post('/', async (req, res, next) => {
  try {
    const data = req.body.data;
    if (!(await childTextModel.findById(data.text)))
      res.status(404).json({ success: false, message: 'text does not exist' });
    const doc = await validationModel.findOneAndUpdate(
      { text: data.text },
      { $push: { answers: data.answer } },
      { upsert: true, new: true },
    );
    return res.json({ success: true, message: doc });
  } catch (e) {
    next(e);
  }
});

export default validationRouter;
