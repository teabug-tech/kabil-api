import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
// import errorMiddleware from '../middlewares/errorMiddleware';
import * as dotenv from 'dotenv';

dotenv.config();

let ParentTextRouter = Router();

if (process.env.NODE_ENV == 'test') ParentTextRouter = express();

ParentTextRouter.post('/', ParentTextController.createOne);
ParentTextRouter.put('/', ParentTextController.updateOne);
ParentTextRouter.get('/', ParentTextController.getOne);

export default ParentTextRouter;
