import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import { IChildText } from '../models/ChildText';
import { IDialect } from '../models/Dialect';
import { IDomain } from '../models/Domain';
import { IParentText } from '../models/ParentText';
import { IScript } from '../models/Scripts';
import { IVoice } from '../models/Voice';
import ArabicScriptService from '../services/ArabicScriptService';
import ChildTextService from '../services/ChildTextService';
import DialectService from '../services/DialectService';
import DomainService from '../services/DomainService';
import LatinScriptService from '../services/LatinScriptService';
import ParentTextService from '../services/ParentTextService';
import VoiceService from '../services/VoiceService';
import controller from '../shared/controller';
import { IChildData, IRequest } from '../types';

type Ops = keyof typeof services;
type Refs = IScript | IVoice | IDomain | IDialect;

const services = {
  latinScript: async (data) => await LatinScriptService.createOne({ user: data.user, script: data.latinScript })(),
  arabicScript: async (data) => await ArabicScriptService.createOne({ user: data.user, script: data.arabicScript })(),
  voice: async (data) => await VoiceService.createOne({ user: data.user, url: data.voice })(),
  domain: async (data) => await DomainService.createOne({ name: data.domain })(),
  dialect: async (data) => await DialectService.createOne({ name: data.dialect })(),
};

const applyOp = (op: Ops) => async (data: Refs) => {
  const res = await services[op](data);
  return res._id;
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
      const childData: IChildData = req.body.data;
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
};
