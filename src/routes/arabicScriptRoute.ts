import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import { Condition, ObjectId } from 'mongoose';
import ArabicScriptController from '../controllers/ArabicScriptController';
import errorMiddleware from '../middlewares/errorMiddleware';

dotenv.config();
let arabicScriptRouter = Router();

if (process.env.NODE_ENV == 'test') arabicScriptRouter = express();

arabicScriptRouter.use(express.json());

arabicScriptRouter.get('/', async (req, res, next) => {
  const select = ArabicScriptController.getMany({ user: req.query.user as string });
  const exec = select('script user');
  return await exec(req, res, next);
});

arabicScriptRouter.get('/:id', async (req, res, next) => {
  const select = ArabicScriptController.getOne({ _id: req.params.id as Condition<ObjectId> });
  const exec = select('script user');
  return await exec(req, res, next);
});

arabicScriptRouter.get('/', ArabicScriptController.getAll);

arabicScriptRouter.post('/', ArabicScriptController.createOne);

arabicScriptRouter.delete('/', ArabicScriptController.deleteOne);

arabicScriptRouter.put('/', ArabicScriptController.updateOne);

if (process.env.NODE_ENV == 'test') arabicScriptRouter.use(errorMiddleware);

export default arabicScriptRouter;
