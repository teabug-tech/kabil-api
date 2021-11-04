import express from 'express';
import morgan from 'morgan';
import connect from './db/connect';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import Test from './models/Test';
import testRouter from './routes/testRoute';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());

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

app.use('/test', testRouter);
app.get('/', async (req, res, next) => {
  try {
    await Test.create({ name: 'dd', age: 17 });
    res.end('hello world');
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);
start();
