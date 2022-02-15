import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import DialectService from '../services/DialectService';
import UserService from '../services/UserService';
import jwt from 'jsonwebtoken';

const guestRouter = Router();

const createGuest = async () => {
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
  const dialect = await DialectService.createOne({ name: 'guest' })();
  guest.dialect = dialect._id;
  const exec = UserService.createOne(guest);
  const createdGuest = await exec();
  return createdGuest;
};

guestRouter.post('/', async (req, res, next) => {
  try {
    const guest = await createGuest();
    const tokenGuest = { _id: guest._id, role: guest.role };
    const token = jwt.sign({ ...tokenGuest }, process.env.JWT_SECRET);
    res.cookie('JWT', token, { sameSite: 'none', secure: false });
    return res.json({ success: true, message: token });
  } catch (e) {
    next(e);
  }
});

export default guestRouter;
