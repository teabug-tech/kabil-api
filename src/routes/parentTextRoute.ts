import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
// import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';
import { IRequest } from '../types';
import { PopulateOptions } from 'mongoose';

dotenv.config();

let ParentTextRouter = Router();

if (process.env.NODE_ENV == 'test') ParentTextRouter = express();

ParentTextRouter.post('/', ParentTextController.createOne);
ParentTextRouter.put('/', ParentTextController.updateOne);
ParentTextRouter.get('/:id', async (req: IRequest, res, next) => {
  return await ParentTextController.getOneAndPopulate({ _id: req.params.id })([
    'arabicScript',
    'latinScript',
    'dialect',
  ])()(req, res, next);
});

export default ParentTextRouter;
