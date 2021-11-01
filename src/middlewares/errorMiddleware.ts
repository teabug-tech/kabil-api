import { NextFunction, Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
import { handleDuplicateKeyError, handleValidationError } from '../controllers/errorController';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof MongoServerError) {
      if (err.code && err.code == 11000) {
        return handleDuplicateKeyError(err, res);
      }
    }
    if (err instanceof Error.ValidationError) {
      return handleValidationError(err, res);
    }
    return res.status(400).send(err.message);
  } catch (err) {
    return res.status(500).send('An unknown error occurred.');
  }
};
