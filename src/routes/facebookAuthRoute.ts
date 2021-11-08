import { Router } from 'express';
import * as queryString from 'query-string';
import * as dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config();
const facebookAuthRouter = Router();

const stringifiedParams = queryString.stringify({
  client_id: process.env.FACEBOOK_CLIENT_ID,
  redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
  scope: ['public_profile', ' email'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

async function getAccessTokenFromCode(code) {
  const { data } = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      redirect_uri: process.env.FACEBOOK_REDIRECT_URL,
      code,
    },
  });
  return data.access_token;
}

async function getFacebookUserData(access_token) {
  const { data } = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: access_token,
    },
  });
  return data;
}

facebookAuthRouter.get('/auth/facebook/url', (req, res) => {
  const facebookUrl = `https://www.facebook.com/v12.0/dialog/oauth?
                    client_id=${process.env.FACEBOOK_CLIENT_ID}
                    &redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}`;
  return res.end(facebookUrl);
});

facebookAuthRouter.get('/auth/facebook', async (req, res, next) => {
  try {
    const code = req.query.code;
    const token = await getAccessTokenFromCode(code);
    const user = await getFacebookUserData(token);
    res.cookie('JWT', jwt.sign(user, process.env.JWT_SECRET));
    res.redirect('/hello');
  } catch (e) {
    next(e);
  }
});

export default facebookAuthRouter;
