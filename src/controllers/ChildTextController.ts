import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import childTextModel from '../models/ChildText';
import ChildTextService from '../services/ChildTextService';
import ParentTextService from '../services/ParentTextService';
import controller from '../shared/controller';
import { applyOp, makeLookupObjects, Ops } from '../shared/helpers';
import { IChildData, IChildText, IParentText, IRequest, Refs } from '../types';

const makeChildObject = async (childData: IChildData, parent: IParentText, user: Types.ObjectId) => {
  const child = { ...childData };
  for (const key in parent) {
    if (!(key in childData)) {
      child[key] = parent[key];
    } else {
      const getId = applyOp(key as Ops);
      child[key] = await getId({ user, [key]: child[key] } as Refs);
    }
  }
  return child as IChildText;
};

export default {
  ...controller(ChildTextService),
  createOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      if (req.file && req.file.filename != '') body.voice = req.file.path;
      const childData: IChildData = body;
      const parentId: Types.ObjectId = childData.parent;
      const parent = await ParentTextService.getOne({ _id: parentId })('-_id -childTexts')();
      const child: IChildText = await makeChildObject(childData, parent, req.user._id);
      console.log(child);
      const exec = ChildTextService.createOne(child);
      const createdChild = await exec();
      return res.send(createdChild);
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const lookupObjects = makeLookupObjects(['arabicScript', 'latinScript', 'voice', 'domain', 'voice', 'dialect']);
      const text = await childTextModel
        .aggregate([...lookupObjects])
        .sample(1)
        .exec();
      res.send(text);
    } catch (e) {
      next(e);
    }
  },
};
