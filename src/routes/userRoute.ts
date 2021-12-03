import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import AuthController from '../controllers/AuthController';

dotenv.config();

let userRouter = Router();

if (process.env.NODE_ENV == 'test') {
  userRouter = express();
  userRouter.use(express.json());
}

userRouter.get('/', async (req, res, next) => {
  const select = UserController.getMany({ ...req.query });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.get('/:id', async (req, res, next) => {
  const select = UserController.getOne({ _id: req.params.id });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.post('/', UserController.createOne);

userRouter.delete('/', UserController.deleteOne);

userRouter.put('/', UserController.updateOne);

if (process.env.NODE_ENV == 'test') userRouter.use(errorMiddleware);

userRouter.use(AuthController);

export default userRouter;
