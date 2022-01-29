import { Router } from 'express';
import ValidationController from '../controllers/ValidationController';
import validationModel from '../models/Validation';

const validationRouter = Router();

validationRouter.get('/', (req, res) => {
  res.end('hello world!');
});
validationRouter.post('/', async (req, res, next) => {
  try {
    const data = req.body.data;
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
