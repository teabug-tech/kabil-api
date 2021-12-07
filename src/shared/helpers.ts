import { Lookup } from '../types';

export const makeLookupObjects = (lookups: Array<string>): Array<Lookup> =>
  lookups.map((lookup) => ({
    $lookup: {
      from: lookup.toLowerCase() + 's',
      localField: lookup,
      foreignField: '_id',
      as: lookup,
    },
  }));
