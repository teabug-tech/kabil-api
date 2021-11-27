import { NextFunction, Response, Request } from 'express';
import DialectService from '../services/DialectService';
import UserService from '../services/UserService';
import controller from '../shared/controller';

export default {
  ...controller(UserService),
  createOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body.data;
      let dialect = await DialectService.getOne({ name: data.name })()();
      if (!dialect) dialect = await DialectService.createOne({ name: data.dialect })();
      data.dialect = dialect._id;
      console.log(dialect);
      const exec = UserService.createOne(data);
      const user = await exec();
      req.body.user = { _id: user._id, role: user.role };
      next();
    } catch (e) {
      next(e);
    }
  },
};
