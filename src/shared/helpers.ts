import ArabicScriptService from '../services/ArabicScriptService';
import DialectService from '../services/DialectService';
import DomainService from '../services/DomainService';
import LatinScriptService from '../services/LatinScriptService';
import VoiceService from '../services/VoiceService';
import { Lookup, Refs } from '../types';

export type Ops = keyof typeof services;

export const makeLookupObjects = (lookups: Array<string>): Array<Lookup> =>
  lookups.map((lookup) => ({
    $lookup: {
      from: lookup.toLowerCase() + 's',
      localField: lookup,
      foreignField: '_id',
      as: lookup,
    },
  }));

export const services = {
  latinScript: async (data) => await LatinScriptService.createOne({ user: data.user, script: data.latinScript })(),
  arabicScript: async (data) => await ArabicScriptService.createOne({ user: data.user, script: data.arabicScript })(),
  voice: async (data) => await VoiceService.createOne({ user: data.user, url: data.voice })(),
  domain: async (data) => await DomainService.createOne({ name: data.domain })(),
  dialect: async (data) => await DialectService.createOne({ name: data.dialect })(),
};

export const applyOp = (op: Ops) => async (data: Refs) => {
  const res = await services[op](data);
  return res._id;
};
