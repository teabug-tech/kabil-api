import { ObjectId } from 'mongodb';
import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import childTextModel from '../models/ChildText';
import ChildTextService from '../services/ChildTextService';
import ParentTextService from '../services/ParentTextService';
import controller from '../shared/controller';
import { applyOp, makeLookupObjects, Ops } from '../shared/helpers';
import { IChildData, IChildText, IParentText, IRequest, Refs } from '../types';

const getRandomFields = (keys: string[], fieldsCount: number) =>
  keys.sort(() => 0.5 - Math.random()).slice(0, fieldsCount);

const makeParentObject = (parent: object, fieldsToInclude: string[]) => {
  const fields = ['arabicScript', 'latinScript', 'voice'];
  const newParent = {};
  for (const key in parent) {
    if (fields.includes(key)) {
      if (fieldsToInclude.includes(key)) {
        newParent[key] = parent[key];
      }
    } else {
      newParent[key] = parent[key];
    }
  }
  return newParent;
};

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
      if (req.file && req.file.filename != '') body.voice = `http://localhost:4444/uploads/${req.file.filename}`;
      const childData: IChildData = body;
      const parentId: Types.ObjectId = childData.parent;
      const parent = await ParentTextService.getOne({ _id: parentId })('-_id -childTexts')();
      const child: IChildText = await makeChildObject(childData, parent, req.user._id);
      const exec = ChildTextService.createOne(child);
      const createdChild = await exec();
      return res.send(createdChild);
    } catch (e) {
      next(e);
    }
  },
  getSlice: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const lookupObjects = makeLookupObjects(['arabicScript', 'latinScript', 'domain', 'voice', 'dialect']);
      const text = await childTextModel
        .aggregate([...lookupObjects])
        .match({ parent: { $nin: req.user.createdTexts } })
        .sample(1)
        .exec();
      const fields = getRandomFields(['arabicScript', 'latinScript', 'voice'], Math.floor((Math.random() + 0.5) * 2));
      const parent = makeParentObject(text[0], fields);
      return res.send([parent]);
    } catch (e) {
      next(e);
    }
  },
  getOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      console.log(req.user);
      const lookupObjects = makeLookupObjects(['arabicScript', 'latinScript', 'domain', 'voice', 'dialect']);
      const text = await childTextModel
        .aggregate([...lookupObjects])
        .match({ $and: [{ _id: { $nin: req.user.createdTexts } }, { _id: { $nin: req.user.validatedTexts } }] })
        .sample(1)
        .exec();
      res.send(text);
    } catch (e) {
      next(e);
    }
  },
};
