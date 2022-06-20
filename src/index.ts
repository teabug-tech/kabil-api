import express from 'express';
import morgan from 'morgan';
import { connect } from './db';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import { userAuth } from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';
import googleAuthRouter from './routes/googleAuthRoute';
import facebookAuthRouter from './routes/facebookAuthRoute';
import userRouter from './routes/userRoute';
import ParentTextRouter from './routes/parentTextRoute';
import childTextRouter from './routes/childTextRoute';
import cors from 'cors';
import validationRouter from './routes/validationRoute';
import path from 'path';
import guestRouter from './routes/guestRoute';

dotenv.config();
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors({
  origin: 'https://kabil-webapp.vercel.app'
}));

app.get('/', (req, res) => res.end(__dirname));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server up and running on port ${process.env.PORT} !`);
    });
  } catch (e) {
    console.error(e);
  }
};

app.use('/users', userRouter);

app.use('/auth', googleAuthRouter);
app.use('/auth', facebookAuthRouter);
app.use('/guest', guestRouter);
app.use('/auth', googleAuthRouter);
app.use(userAuth);
app.use('/parent/texts', ParentTextRouter);
app.use('/child/texts', childTextRouter);
app.use('/validations', validationRouter);

app.get('/hello', (req, res) => {
  return res.end('hello world');
});

app.use(errorMiddleware);
start();
