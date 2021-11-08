import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();
export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jwt.sign(req.body.user, process.env.JWT_SECRET);
    res.json(token);
  } catch (e) {
    next(e);
  }
};
