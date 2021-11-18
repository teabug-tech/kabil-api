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

userRouter.get('/', UserController.getAll);

userRouter.post('/', UserController.createOne);

userRouter.delete('/', UserController.deleteOne);

userRouter.put('/', UserController.updateOne);

export default userRouter;
