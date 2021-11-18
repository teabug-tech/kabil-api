import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express();

userRouter.use(express.json());

userRouter.get('/', async (req, res, next) => {
  const select = UserController.getMany({ firstName: req.query.name as string });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.get('/:id', async (req, res, next) => {
  const select = UserController.getOne({ _id: req.params.id });
  const exec = select('firstName lastName score');
  return await exec(req, res, next);
});

userRouter.get('/', async (req, res, next) => {
  return await UserController.getAll(req, res, next);
});

userRouter.post('/', async (req, res, next) => {
  return await UserController.createOne(req, res, next);
});

userRouter.delete('/', async (req, res, next) => {
  return await UserController.deleteOne(req, res, next);
});

userRouter.put('/', async (req, res, next) => {
  return await UserController.updateOne(req, res, next);
});

export default userRouter;
