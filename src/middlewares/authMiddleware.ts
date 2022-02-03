import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../types';
import userModel from '../models/User';

dotenv.config();

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const { role } = jwt.verify(token, process.env.JWT_SECRET);
    if (role != 'admin') throw new Error('not allowed');
    next();
  } catch (e) {
    next(e);
  }
};

export const userAuth = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization']?.split(' ')[1];
    }
    if (!token) token = req.headers['jwt'];
    console.log(token);
    if (!token) throw new Error('not allowed');
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role != 'user' && user.role != 'guest') throw new Error('not allowed');
    req.user = await userModel.findById(user._id);
    next();
  } catch (e) {
    next(e);
  }
};
