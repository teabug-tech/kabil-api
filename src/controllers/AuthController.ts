import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

dotenv.config();
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jwt.sign({ ...req.body.user }, process.env.JWT_SECRET);
    res.cookie('JWT', token);
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
    if (userDoc.password !== user.password) throw new Error('invalid credentials');
    return res.json({ success: true, message: userDoc });
  } catch (e) {
    next(e);
  }
};
