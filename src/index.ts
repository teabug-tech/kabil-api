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
import validationRouter from './routes/validationRoute';
import path from 'path';

const PORT = process.env.PORT || '4444';

dotenv.config();
const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req, res) => res.end(__dirname));
app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT} !`);
    });
  } catch (e) {
    console.error(e);
  }
};

app.use('/users', userRouter);

app.use('/auth', googleAuthRouter);
app.use('/auth', facebookAuthRouter);

app.use('/test', testRouter);
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
