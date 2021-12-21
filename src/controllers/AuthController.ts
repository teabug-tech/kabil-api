import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import bcrypt from 'bcrypt';

dotenv.config();
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jwt.sign({ ...req.body.user }, process.env.JWT_SECRET);
    res.cookie('JWT', token, { sameSite: 'none', secure: false });
    return res.json({ success: true, message: req.body.user });
  } catch (e) {
    next(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;

    const userDoc = await UserService.getOneAndPopulate({ email: user.email })(['dialect'])()();
    if (!userDoc) throw new Error('invalid credentials!');
    if (!bcrypt.compareSync(user.password, userDoc.password)) throw new Error('invalid credentials');
    const token = jwt.sign({ ...userDoc }, process.env.JWT_SECRET);
    res.cookie('JWT', token, { sameSite: 'none', secure: false });
    return res.json({ success: true, message: { user: userDoc, token } });
  } catch (e) {
    next(e);
  }
};
