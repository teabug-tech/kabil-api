import { Request, Response } from 'express';
import parentTextModel from '../models/ParentText';
import ParentTextService from '../services/ParentTextService';
import controller from '../shared/controller';

export default {
  ...controller(ParentTextService),
  getOne: async (req: Request, res: Response) => {
    let text = await parentTextModel.aggregate().match({ isCompleted: false }).sample(1).exec();
    if (!text.length) text = await parentTextModel.aggregate().sample(1).exec();
    res.send(text);
  },
};
