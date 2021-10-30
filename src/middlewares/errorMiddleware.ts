import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { handleDuplicateKeyError, handleValidationError } from '../controllers/errorController';

export default (err: ErrorRequestHandler | any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err.name === 'ValidationError') return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000) return (err = handleDuplicateKeyError(err, res));
    else res.status(400).send(err.message);
  } catch (err) {
    res.status(500).send('An unknown error occurred.');
  }
};
