import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
export default (req, res, next) => {
  try {
    const token = jwt.sign(req.body.user, process.env.JWT_SECRET);
    res.json(token);
  } catch (e) {
    next(e);
  }
};
