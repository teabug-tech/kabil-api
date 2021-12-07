import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import AuthController, { login } from '../controllers/AuthController';
import { adminAuth, userAuth } from '../middlewares/authMiddleware';
import { IRequest } from '../types';

dotenv.config();

let userRouter = Router();

if (process.env.NODE_ENV == 'test') {
  userRouter = express();
  userRouter.use(express.json());
}

userRouter.post('/login', login);
userRouter.post('/', UserController.createOne);

userRouter.delete('/', adminAuth, UserController.deleteOne);

userRouter.get('/', adminAuth, async (req: IRequest, res, next) => {
  const select = UserController.getMany({ ...req.query });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.get('/:id', userAuth, async (req: IRequest, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) throw new Error('Invalid request');
    const select = UserController.getOne({ _id: req.params.id });
    const exec = select('firstName lastName score');
    return await exec(req, res, next);
  } catch (e) {
    next(e);
  }
});

userRouter.put('/', async (req: IRequest, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) throw new Error('Invalid request');
    return await UserController.updateOne(req, res, next);
  } catch (e) {
    next(e);
  }
});

if (process.env.NODE_ENV == 'test') userRouter.use(errorMiddleware);

userRouter.use(AuthController);

export default userRouter;
