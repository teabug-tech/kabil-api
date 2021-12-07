import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
import * as dotenv from 'dotenv';
import { IRequest } from '../types';

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
    'voice',
    'domain',
  ])()(req, res, next);
});
ParentTextRouter.get('/', ParentTextController.getOne);

export default ParentTextRouter;
