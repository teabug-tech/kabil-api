import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
// import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import parentTextModel from '../models/ParentText';

dotenv.config();

let ParentTextRouter = Router();

if (process.env.NODE_ENV == 'test') ParentTextRouter = express();

ParentTextRouter.post('/', ParentTextController.createOne);
ParentTextRouter.put('/', ParentTextController.updateOne);
ParentTextRouter.get('/', async (req, res) => {
  let text = await parentTextModel.aggregate().match({ isCompleted: false }).sample(1).exec();
  if (!text.length) text = await parentTextModel.aggregate().sample(1).exec();
  res.send(text);
});

export default ParentTextRouter;
