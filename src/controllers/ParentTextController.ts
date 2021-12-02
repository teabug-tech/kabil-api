import { Request, Response } from 'express';
import parentTextModel from '../models/ParentText';
import ArabicScriptService from '../services/ArabicScriptService';
import DomainService from '../services/DomainService';
import LatinScriptService from '../services/LatinScriptService';
import ParentTextService from '../services/ParentTextService';
import VoiceService from '../services/VoiceService';
import controller from '../shared/controller';
import { IRequest } from '../types';

const services = {
  latinScript: LatinScriptService,
  arabicScript: ArabicScriptService,
  voice: VoiceService,
  domain: DomainService,
};

type Ops = 'latinScript' | 'arabicScript' | 'voice' | 'domain';

const applyOps = async (op: Ops, data) => {
  services[op].createOne(data)();
};

export default {
  ...controller(ParentTextService),
  getOne: async (req: IRequest, res: Response) => {
    console.log(req.user);
    let text = await parentTextModel.aggregate().match({ isCompleted: false }).sample(1).exec();
    if (!text.length) text = await parentTextModel.aggregate().sample(1).exec();
    res.send(text);
  },
  createOne: async (req: IRequest, res: Response) => {},
};
