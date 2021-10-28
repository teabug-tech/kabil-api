import express from 'express';
import morgan from 'morgan';
import connect from './db/connect';
import * as dotenv from 'dotenv';

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
    console.log(e);
  }
};

app.get('/', (req, res) => {
  res.end('hello world');
});

start();
