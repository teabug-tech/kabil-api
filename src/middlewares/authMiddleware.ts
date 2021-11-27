import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

dotenv.config();

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const res = jwt.verify(token, process.env.JWT_SECRET);
    if (res.role != 'admin') throw new Error('not allowed');
    next();
  } catch (e) {
    next(e);
  }
};

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (Object.prototype.hasOwnProperty.call(req, 'cookies')) token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const res = jwt.verify(token, process.env.JWT_SECRET);
    if (res.role != 'user') throw new Error('not allowed');
    // req.user = admn;
    next();
  } catch (e) {
    next(e);
  }
};
