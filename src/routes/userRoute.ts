import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import { Condition, ObjectId } from 'mongoose';
import UserService from '../services/UserService';
import DialectService from '../services/DialectService';
import AuthController from '../controllers/AuthController';

dotenv.config();

let userRouter = Router();

if (process.env.NODE_ENV == 'test') userRouter = express();

userRouter.use(express.json());

userRouter.get('/', async (req, res, next) => {
  const select = UserController.getMany({ ...req.query });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.get('/:id', async (req, res, next) => {
  const select = UserController.getOne({ _id: req.params.id as Condition<ObjectId> });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.post('/', async (req, res, next) => {
  try {
    const data = req.body.data;
    let dialect = await DialectService.getOne({ name: data.name })()();
    if (!dialect) dialect = await DialectService.createOne({ name: data.dialect })();
    data.dialect = dialect._id;
    console.log(dialect);
    const exec = UserService.createOne(data);
    const user = await exec();
    req.body.user = { _id: user._id, role: user.role };
    next();
  } catch (e) {
    next(e);
  }
});

userRouter.use(AuthController);

userRouter.delete('/', UserController.deleteOne);

userRouter.put('/', UserController.updateOne);

// if (process.env.NODE_ENV == 'test') userRouter.use(errorMiddleware);

export default userRouter;
