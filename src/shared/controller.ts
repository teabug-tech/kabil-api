import { NextFunction, Request, Response } from 'express';

type GetOneFn<T, U> = (filter: T) => (arg: string | object | string[]) => () => Promise<U>;
type GetManyFn<T, U> = (filter: T) => (arg: string | object | string[]) => () => Promise<U>;
type GetAllFn<U> = () => Promise<U>;
type CreateOneFn<U> = (data: object) => () => Promise<U>;
type UpdateOneFn<T, U> = (filter: T) => (data: object) => (options: object) => () => Promise<U>;
type DeleteOneFn<T, U> = (filter: T) => () => Promise<U>;

const getOne =
  <T, U>(getOne: GetOneFn<T, U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.body.filter;
      const arg = req.body.arg;
      const select = getOne(filter);
      const exec = select(arg);
      const doc = await exec();
      return res.status(200).json({ success: true, message: doc });
    } catch (e) {
      next(e);
    }
  };

const getMany =
  <T, U>(getMany: GetManyFn<T, U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.body.filter;
      const arg = req.body.arg;
      const select = getMany(filter);
      const exec = select(arg);
      const docs = await exec();
      return res.status(200).json({ success: true, message: docs });
    } catch (e) {
      next(e);
    }
  };

const getAll =
  <U>(getAll: GetAllFn<U>) =>
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const docs = await getAll();
      return res.status(200).json({ success: true, message: docs });
    } catch (e) {
      next(e);
    }
  };

const createOne =
  <U>(createOne: CreateOneFn<U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body.data;
      const exec = createOne(data);
      const resu = await exec();
      return res.status(201).json({ success: true, message: resu });
    } catch (e) {
      next(e);
    }
  };

const updateOne =
  <T, U>(updateOne: UpdateOneFn<T, U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.body.filter;
      const data = req.body.data;
      const options = req.body.options;

      const insertData = updateOne(filter);
      const insertOptions = insertData(data);
      const exec = insertOptions(options);
      const updated = await exec();
      return res.status(200).json({ success: true, message: updated });
    } catch (e) {
      next(e);
    }
  };

const deleteOne =
  <T, U>(deleteOne: DeleteOneFn<T, U>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter = req.body.filter;
      const exec = deleteOne(filter);
      const deleted = await exec();
      return res.status(200).json({ success: true, message: deleted });
    } catch (e) {
      next(e);
    }
  };

interface crud<T, U> {
  getOne: GetOneFn<T, U>;
  getMany: GetManyFn<T, U>;
  getAll: GetAllFn<U>;
  createOne: CreateOneFn<U>;
  updateOne: UpdateOneFn<T, U>;
  deleteOne: DeleteOneFn<T, U>;
}

// export default <T, U>(crud: crud<T, U>) => ({
//   getOne: getOne(crud.getOne),
//   getMany: getMany(crud.getMany),
//   getAll: getAll(crud.getAll),
//   createOne: createOne(crud.createOne),
//   updateOne: updateOne(crud.updateOne),
//   deleteOne: deleteOne(crud.deleteOne),
// });

export default <T, U>(getManyFn: GetManyFn<T, U>, getAllFn: GetAllFn<U>) => ({
  getMany: getMany(getManyFn),
  getAll: getAll(getAllFn),
});
