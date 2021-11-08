import express from 'express';
import morgan from 'morgan';
import connect from './db/connect';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import testRouter from './routes/testRoute';
import authMiddleware from './middlewares/authMiddleware';
import AuthController from './controllers/AuthController';
import cookieParser from 'cookie-parser';
import googleAuthRouter from './routes/googleAuthRoute';
import facebookAuthRouter from './routes/facebookAuthRoute';

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

app.use(googleAuthRouter);
app.use(facebookAuthRouter);

app.use('/test', testRouter);

app.post('/sign', AuthController);

app.use(authMiddleware);
app.get('/hello', (req, res) => {
  return res.end('hello world');
});

app.use(errorMiddleware);
start();
