import { NextFunction, Request, Response, Router } from 'express';
import TestController from '../controllers/TestController';
import multer from 'multer';
import path from 'path';

const upload = multer({
  dest: 'uploads/',
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'application/octet-stream') return cb(new Error('Something went wrong'));

    cb(null, true);
  },
});
const testRouter = Router();

testRouter.post('/', upload.single('audio'), async (req, res, next) => {
  try {
    return res.send(req.file);
  } catch (e) {
    next(e);
  }
});

testRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  return await TestController.getOne({ _id: req.params.id })('name age -_id')(req, res, next);
});

export default testRouter;
