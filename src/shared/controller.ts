import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import {
  Arg,
  CreateOneFn,
  crud,
  DeleteOneFn,
  GetAllFn,
  GetManyFn,
  GetOneAndPopulateFn,
  GetOneFn,
  UpdateOneFn,
} from '../types';

const getOne =
  <T, U>(getOne: GetOneFn<T, U>) =>
  (filter: FilterQuery<T>) =>
  (arg?: Arg) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const select = getOne(filter);
      const exec = select(arg);
      const doc = await exec();
      return res.status(200).json({ success: true, message: doc });
    } catch (e) {
      next(e);
    }
  };

const getOneAndPopulate =
  <T, U>(getOneAndPopulate: GetOneAndPopulateFn<T, U>) =>
  (filter: FilterQuery<T>) =>
  (fieldsToPopulate: Array<string>) =>
  (arg?: Arg) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const populate = getOneAndPopulate(filter);
      const select = populate(fieldsToPopulate);
      const exec = select(arg);
      const doc = await exec();
      return res.status(200).json({ success: true, message: doc });
    } catch (e) {
      next(e);
    }
  };

const getMany =
  <T, U>(getMany: GetManyFn<T, U>) =>
  (filter: FilterQuery<T>) =>
  (arg?: Arg) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      let options = req.body.options;
      if (!options) options = { new: true };
      const insertData = updateOne(filter);
      const insertOptions = insertData(data);
      const exec = insertOptions(options);
      const updated = await exec();
      if (!updated) return res.status(404).json({ success: false, message: 'Document not found' });
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
      if (!deleted) return res.status(404).json({ success: false, message: 'Document not found' });
      return res.status(200).json({ success: true, message: deleted });
    } catch (e) {
      next(e);
    }
  };

export default <T, U>(crud: crud<T, U>) => ({
  getOne: getOne(crud.getOne),
  getMany: getMany(crud.getMany),
  getAll: getAll(crud.getAll),
  createOne: createOne(crud.createOne),
  updateOne: updateOne(crud.updateOne),
  deleteOne: deleteOne(crud.deleteOne),
  getOneAndPopulate: getOneAndPopulate(crud.getOneAndPopulate),
});
