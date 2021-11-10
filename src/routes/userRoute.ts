import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express();

userRouter.get('/:id', async (req, res, next) => {
  const select = UserController.getOne({ _id: req.params.id });
  const exec = select('firstname lastname score gender role');
  return await exec(req, res, next);
});

userRouter.post('/', async (req, res, next) => {
  return await UserController.createOne(req, res, next);
});

export default userRouter;
