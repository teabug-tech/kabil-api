import { Router } from 'express';
import ValidationController from '../controllers/ValidationController';

const validationRouter = Router();

validationRouter.get('/', (req, res) => {
  res.end('hello world!');
});
validationRouter.post('/', ValidationController.createOne);

export default validationRouter;
