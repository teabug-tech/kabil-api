import { NextFunction, Request, Response, Router } from 'express';
import TestController from '../controllers/TestController';

const testRouter = Router();

testRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  return await TestController.getOne({ _id: req.params.id })('name age -_id')(req, res, next);
});

export default testRouter;
