import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies['JWT'];
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

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies['JWT'];
    if (!token) {
      token = req.headers['authorization'].split(' ')[1];
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role != 'user') throw new Error('not allowed');
    next();
  } catch (e) {
    next(e);
  }
};
