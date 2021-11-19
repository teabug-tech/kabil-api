import * as dotenv from 'dotenv';
import express, { Router } from 'express';
import LatinScriptController from '../controllers/LatinScriptController';
import errorMiddleware from '../middlewares/errorMiddleware';

dotenv.config();
let latinScriptRouter = Router();

if (process.env.NODE_ENV == 'test') latinScriptRouter = express();

latinScriptRouter.use(express.json());

latinScriptRouter.get('/', async (req, res, next) => {
  const select = LatinScriptController.getMany({ user: req.query.user as string });
  const exec = select('script user');
  return await exec(req, res, next);
});

latinScriptRouter.get('/:id', async (req, res, next) => {
  const select = LatinScriptController.getOne({ _id: req.params.id });
  const exec = select('script user');
  return await exec(req, res, next);
});

latinScriptRouter.get('/', LatinScriptController.getAll);

latinScriptRouter.post('/', LatinScriptController.createOne);

latinScriptRouter.delete('/', LatinScriptController.deleteOne);

latinScriptRouter.put('/', LatinScriptController.updateOne);

if (process.env.NODE_ENV == 'test') latinScriptRouter.use(errorMiddleware);

export default latinScriptRouter;
