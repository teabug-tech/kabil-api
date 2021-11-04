import { Router } from 'express';
import TestController from '../controllers/TestController';

const testRouter = Router();

testRouter.get('/:id', TestController.getOne);

export default testRouter;
