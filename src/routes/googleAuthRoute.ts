import { auth } from '@googleapis/docs';
import { Router } from 'express';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const googleAuthRouter = Router();

const oauth2Client = new auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes

googleAuthRouter.get('/auth/google/url', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  return res.send(url);
});

googleAuthRouter.get('/auth/google', async (req, res, next) => {
  try {
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { access_token, id_token } = (await oauth2Client.getToken(req.query.code as string)).tokens;
    oauth2Client.setCredentials({ access_token, id_token });
    const user = (await oauth2.userinfo.get()).data;
    res.cookie('JWT', jwt.sign(user, process.env.JWT_SECRET));
    res.redirect('/hello');
  } catch (e) {
    next(e);
  }
});

export default googleAuthRouter;
