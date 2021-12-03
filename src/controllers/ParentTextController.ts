import { Request, Response, text } from 'express';
import { IDomain } from '../models/Domain';
import parentTextModel, { IParentText } from '../models/ParentText';
import { IScript } from '../models/Scripts';
import { IVoice } from '../models/Voice';
import ArabicScriptService from '../services/ArabicScriptService';
import DomainService from '../services/DomainService';
import LatinScriptService from '../services/LatinScriptService';
import ParentTextService from '../services/ParentTextService';
import VoiceService from '../services/VoiceService';
import controller from '../shared/controller';
import { IRequest } from '../types';

const services = {
  latinScript: async (data) => await LatinScriptService.createOne({ user: data.user, script: data.latinScript })(),
  arabicScript: async (data) => await ArabicScriptService.createOne({ user: data.user, script: data.arabicScript })(),
  voice: async (data) => await VoiceService.createOne({ user: data.user, url: data.voice })(),
  domain: async (data) => await DomainService.createOne({ user: data.user, name: data.bname })(),
};

type Ops = keyof typeof services;
type Data = IScript | IVoice | IDomain;

const applyOp = (op: Ops) => async (data: IScript | IVoice | IDomain) => {
  const res = await services[op](data);
  return res._id;
};

const makeParentObject = async (body: IParentText, user) => {
  const parent = { ...body };
  for (const key in body) {
    if (key in services) {
      const getId = applyOp(key as Ops);
      parent[key] = await getId({ user: user._id, [key]: body[key] } as Data);
    }
  }
  console.log(parent);
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
  createOne: async (req: IRequest, res: Response) => {
    const body = req.body.data;
    const parent: IParentText = await makeParentObject(body, req.user);
    const exec = ParentTextService.createOne(parent);
    const result = await exec();
    res.send(result);
  },
};
