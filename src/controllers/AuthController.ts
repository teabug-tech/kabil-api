import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();
export default (req: Request, res: Response, next: NextFunction) => {
  console.log('signing in a new token');
  try {
    const token = jwt.sign({ ...req.body.user }, process.env.JWT_SECRET);
    res.cookie('JWT', token);
    return res.json({ success: true, message: token });
  } catch (e) {
    next(e);
  }
};
