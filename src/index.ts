import express from 'express';
import morgan from 'morgan';
import connect from './db/connect';
import * as dotenv from 'dotenv';
import errorMiddleware from './middlewares/errorMiddleware';
import Test from './models/Test';
import testRouter from './routes/testRoute';
import { auth } from '@googleapis/docs';
import { google } from 'googleapis';
import authMiddleware from './middlewares/authMiddleware';
import AuthController from './controllers/AuthController';

dotenv.config();
const app = express();

const oauth2Client = new auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

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
app.get('/', (req, res, next) => {
  return res.send(url);
});

app.get('/auth/google', async (req, res) => {
  const { access_token, id_token } = (await oauth2Client.getToken(req.query.code as string)).tokens;
  oauth2Client.setCredentials({ access_token, id_token });
  console.log(await oauth2.userinfo.get());
  res.end();
});

app.post('/sign', AuthController);
app.use(authMiddleware);
app.get('/hello', (req, res) => {
  return res.end('hello world');
});

app.use(errorMiddleware);
start();
