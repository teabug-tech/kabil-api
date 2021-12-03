import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import parentTextModel, { IParentText } from '../models/ParentText';
import { IScript } from '../models/Scripts';
import { IVoice } from '../models/Voice';
import ArabicScriptService from '../services/ArabicScriptService';
import LatinScriptService from '../services/LatinScriptService';
import ParentTextService from '../services/ParentTextService';
import VoiceService from '../services/VoiceService';
import controller from '../shared/controller';
import { IRequest } from '../types';

type Ops = keyof typeof services;
type ParentRefs = IScript | IVoice;

const services = {
  latinScript: async (data) => await LatinScriptService.createOne({ user: data.user, script: data.latinScript })(),
  arabicScript: async (data) => await ArabicScriptService.createOne({ user: data.user, script: data.arabicScript })(),
  voice: async (data) => await VoiceService.createOne({ user: data.user, url: data.voice })(),
};

const applyOp = (op: Ops) => async (data: ParentRefs) => {
  const res = await services[op](data);
  return res._id;
};

const makeParentObject = async (body: IParentText, user: Types.ObjectId) => {
  const parent = { ...body };
  for (const key in body) {
    if (key in services) {
      const getId = applyOp(key as Ops);
      parent[key] = await getId({ user, [key]: body[key] } as ParentRefs);
    }
  }
  return parent;
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
      res.send(result);
    } catch (e) {
      next(e);
    }
  },
};
