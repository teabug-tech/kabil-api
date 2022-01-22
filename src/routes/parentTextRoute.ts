import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
import * as dotenv from 'dotenv';
import { IRequest } from '../types';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'audio/mpeg') return cb(new Error('Something went wrong'));

    cb(null, true);
  },
});

dotenv.config();

let ParentTextRouter = Router();

if (process.env.NODE_ENV == 'test') ParentTextRouter = express();

ParentTextRouter.post('/', upload.single('audio'), ParentTextController.createOne);
ParentTextRouter.put('/', upload.single('audio'), ParentTextController.updateOne);
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
