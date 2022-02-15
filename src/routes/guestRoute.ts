import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const guestRouter = Router();

const createGuest = () => {
  const guest = {
    email: `${Date.now()}@guest.com`,
    firstName: 'guest',
    lastName: 'guest',
    gender: 'male',
    age: 18,
    role: 'guest',
    password: Date.now(),
    dialect: 'guest',
  };
  return guest;
};

guestRouter.post('/', async (req, res, next) => {
  try {
    const guest = createGuest();
    req.body.data = guest;
    return await UserController.createOne(req, res, next);
  } catch (e) {
    next(e);
  }
});

guestRouter.use(AuthController);

export default guestRouter;
