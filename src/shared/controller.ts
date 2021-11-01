import { NextFunction, Request, Response } from 'express';

type GetOneFn<T, U> = (filter: T) => (arg: string | object | string[]) => () => Promise<U>;

const getOne =
  <T, U>(getOne: GetOneFn<T, U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.body;
      const arg = req.body.arg;
      const select = getOne(filter);
      const exec = select(arg);
      await exec();
    } catch (e) {
      next(e);
    }
  };

export default <T, U>(getFn: GetOneFn<T, U>) => ({
  getOne: getOne(getFn),
});
