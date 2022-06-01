import { Router } from 'express';
import ChildTextController from '../controllers/ChildTextController';
import multer from 'multer';

const storage = multer.memoryStorage()

const upload = multer({
  fileFilter: function (req, file, cb) {
    if (file.mimetype != 'audio/mp3' && file.mimetype != 'audio/mpeg') return cb(new Error('Something went wrong'));

    cb(null, true);
  },
  storage: storage,
});
const childTextRouter = Router();

childTextRouter.get('/', ChildTextController.getOne);
// childTextRouter.get('/', ChildTextController.getAll);
childTextRouter
  .route('/')
  .post(upload.single('audio'), ChildTextController.createOne)
  .delete(ChildTextController.deleteOne);

export default childTextRouter;
