import { Router } from 'express';
import ChildTextController from '../controllers/ChildTextController';

const childTextRouter = Router();

childTextRouter.get(':/id', ChildTextController.getOne);
childTextRouter.route('/').post(ChildTextController.createOne).delete(ChildTextController.deleteOne);

export default childTextRouter;
