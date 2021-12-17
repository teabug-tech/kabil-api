import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import parentTextModel from '../models/ParentText';
import ParentTextService from '../services/ParentTextService';
import controller from '../shared/controller';
import { applyOp, makeLookupObjects, Ops, services } from '../shared/helpers';
import { IParentText, IRequest, Refs } from '../types';
import ChildTextController from './ChildTextController';

const makeParentObject = async (data: Refs, user: Types.ObjectId) => {
  const parent = { ...data };
  for (const key in data) {
    if (key in services) {
      const getId = applyOp(key as Ops);
      parent[key] = await getId({ user, [key]: data[key] } as Refs);
    }
  }
  return parent;
};

const validateParentData = async (data: Refs, id: Types.ObjectId) => {
  const parentData = { ...data };
  const parent = await ParentTextService.getOne({ _id: id })()();
  for (const key in parentData) {
    if (key in parent) {
      throw new Error('Access denied');
    }
  }
};

export default {
  ...controller(ParentTextService),
  getOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const lookupObjects = makeLookupObjects(['arabicScript', 'latinScript', 'voice', 'domain', 'voice', 'dialect']);
      const text = await parentTextModel
        .aggregate([...lookupObjects])
        .match({ isCompleted: false })
        .sample(1)
        .exec();
      if (!text.length) return await ChildTextController.getOne(req, res, next);
      res.send(text);
    } catch (e) {
      next(e);
    }
  },
  createOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body = req.body.data;
      const parent: IParentText = await makeParentObject(body, req.user._id);
      const exec = ParentTextService.createOne(parent);
      const result = await exec();
      res.send(result);
    } catch (e) {
      next(e);
    }
  },
  updateOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body = req.body.data;
      const id = req.body.id as Types.ObjectId;
      await validateParentData(body, id);
      const parent = await makeParentObject(body, req.user._id);
      const result = await ParentTextService.updateOne({ _id: id })({ ...parent })({ new: true })();
      res.send(result);
    } catch (e) {
      next(e);
    }
  },
};
