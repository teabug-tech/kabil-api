import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { IRequest } from '../types';

const googleAuthRouter = Router();

async function verify(idToken, audience) {
  const client = new OAuth2Client(audience);
  const ticket = await client.verifyIdToken({
    idToken,
    audience, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

googleAuthRouter.post('/google', async (req: IRequest, res, next) => {
  try {
    const token = req.params.token;
    const clientId = req.params.clientId;
    const payload = await verify(token, clientId);
    res.status(200).json({ success: true, message: payload });
  } catch (e) {
    next(e);
  }
});

export default googleAuthRouter;
