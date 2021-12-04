import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import { IDialect } from '../models/Dialect';
import { IDomain } from '../models/Domain';
import parentTextModel, { IParentText } from '../models/ParentText';
import { IScript } from '../models/Scripts';
import { IVoice } from '../models/Voice';
import ArabicScriptService from '../services/ArabicScriptService';
import DialectService from '../services/DialectService';
import DomainService from '../services/DomainService';
import LatinScriptService from '../services/LatinScriptService';
import ParentTextService from '../services/ParentTextService';
import VoiceService from '../services/VoiceService';
import controller from '../shared/controller';
import { IRequest } from '../types';

type Ops = keyof typeof services;
type ParentRefs = IScript | IVoice | IDomain | IDialect;

const services = {
  latinScript: async (data) => await LatinScriptService.createOne({ user: data.user, script: data.latinScript })(),
  arabicScript: async (data) => await ArabicScriptService.createOne({ user: data.user, script: data.arabicScript })(),
  voice: async (data) => await VoiceService.createOne({ user: data.user, url: data.voice })(),
  domain: async (data) => await DomainService.createOne({ name: data.domain })(),
  dialect: async (data) => await DialectService.createOne({ name: data.dialect })(),
};

const applyOp = (op: Ops) => async (data: ParentRefs) => {
  const res = await services[op](data);
  return res._id;
};

const makeParentObject = async (data: IParentText, user: Types.ObjectId) => {
  const parent = { ...data };
  for (const key in data) {
    if (key in services) {
      const getId = applyOp(key as Ops);
      parent[key] = await getId({ user, [key]: data[key] } as ParentRefs);
    }
  }
  return parent;
};

const validateParentData = async (data: IParentText, id: Types.ObjectId) => {
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
  getOne: async (req: IRequest, res: Response) => {
    console.log(req.user);
    let text = await parentTextModel.aggregate().match({ isCompleted: false }).sample(1).exec();
    if (!text.length) text = await parentTextModel.aggregate().sample(1).exec();
    res.send(text);
  },
  createOne: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const body = req.body.data;
      const parent: IParentText = await makeParentObject(body, req.user._id);
      const exec = ParentTextService.createOne(parent);
      const result = await exec();
      console.log(parent);
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
