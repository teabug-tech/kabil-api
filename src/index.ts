import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.end('hello world');
});

app.listen(4000, () => {
  console.log('server up and running');
});
