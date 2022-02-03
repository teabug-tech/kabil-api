import { Router } from 'express';
import ChildTextController from '../controllers/ChildTextController';
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
    console.log('FILE MIME:', file.mimetype);
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
