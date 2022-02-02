import { NextFunction, Response, Request } from 'express';
import DialectService from '../services/DialectService';
import UserService from '../services/UserService';
import controller from '../shared/controller';

export default {
  ...controller(UserService),
  createOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body.data;
      if (data.role)
        if (data.role != 'guest' && data.role != 'user')
          return res.status(400).json({ success: false, message: 'wrong user role' });
      let dialect = await DialectService.getOne({ name: data.name })()();
      if (!dialect) dialect = await DialectService.createOne({ name: data.dialect })();
      data.dialect = dialect._id;
      const exec = UserService.createOne(data);
      const user = await exec();
      res.status(201);
      req.body.user = { _id: user._id, role: user.role };
      next();
    } catch (e) {
      next(e);
    }
  },
};
