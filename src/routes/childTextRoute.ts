import { Router } from 'express';
import ChildTextController from '../controllers/ChildTextController';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'audio/mpeg') return cb(new Error('Something went wrong'));

    cb(null, true);
  },
});

const childTextRouter = Router();

childTextRouter.get(':/id', ChildTextController.getOne);
childTextRouter.get('/', ChildTextController.getAll);
childTextRouter
  .route('/')
  .post(upload.single('audio'), ChildTextController.createOne)
  .delete(ChildTextController.deleteOne);

export default childTextRouter;
