import express from 'express';
import morgan from 'morgan';
import { connect } from './db';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import testRouter from './routes/testRoute';
import { userAuth } from './middlewares/authMiddleware';
import cookieParser from 'cookie-parser';
import googleAuthRouter from './routes/googleAuthRoute';
import facebookAuthRouter from './routes/facebookAuthRoute';
import userRouter from './routes/userRoute';
import ParentTextRouter from './routes/parentTextRoute';
import childTextRouter from './routes/childTextRoute';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie, *',
  );
  next();
});

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
app.use('/parent/texts', ParentTextRouter);
app.use('/child/texts', childTextRouter);

app.get('/hello', (req, res) => {
  return res.end('hello world');
});

app.use(errorMiddleware);
start();
