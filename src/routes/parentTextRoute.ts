import express, { Router } from 'express';
import ParentTextController from '../controllers/ParentTextController';
import * as dotenv from 'dotenv';
import { IRequest } from '../types';
import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.mp3');
  },
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
});

const upload = multer({
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'audio/mp3' && file.mimetype != 'audio/mpeg') return cb(new Error('Something went wrong'));

    cb(null, true);
  },
  storage: storage,
});

dotenv.config();

let ParentTextRouter = Router();

if (process.env.NODE_ENV == 'test') ParentTextRouter = express();

ParentTextRouter.post('/', upload.single('audio'), ParentTextController.createOne);
ParentTextRouter.put('/', upload.single('audio'), ParentTextController.updateOne);
ParentTextRouter.get('/completed', ParentTextController.getCompleted);
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
