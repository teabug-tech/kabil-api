import express from 'express';
import morgan from 'morgan';
import { connect } from './db';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import testRouter from './routes/testRoute';
import { adminAuth, userAuth } from './middlewares/authMiddleware';
import AuthController from './controllers/AuthController';
import cookieParser from 'cookie-parser';
import googleAuthRouter from './routes/googleAuthRoute';
import facebookAuthRouter from './routes/facebookAuthRoute';
import userRouter from './routes/userRoute';

dotenv.config();
const app = express();

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

app.use('/test', testRouter);

app.use(userAuth);

app.get('/hello', (req, res) => {
  return res.end('hello world');
});

app.use(errorMiddleware);
start();
