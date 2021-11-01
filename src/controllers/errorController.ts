import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Error } from 'mongoose';
// import { Error } from 'mongoose';

export const handleDuplicateKeyError = (err: MongoServerError, res: Response) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `The field ${field} already exists.`;
  res.status(code).json({ message: error, fields: field });
};

export const handleValidationError = (err: Error.ValidationError, res: Response) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const fields = Object.values(err.errors).map((el: any) => el.path);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    res.status(code).json({ message: formattedErrors, fields: fields });
  } else {
    res.status(code).json({ message: errors, fields: fields });
  }
};
