import express from 'express';
import morgan from 'morgan';
import connect from './db/connect';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import Test from './models/Test';

dotenv.config();
const app = express();

app.use(morgan('dev'));

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

app.get('/', async (req, res, next) => {
  try {
    await Test.create({ name: 'taha' });
    res.end('hello world');
  } catch (e) {
    next(e);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
start();
