import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    next(e);
  }
};
