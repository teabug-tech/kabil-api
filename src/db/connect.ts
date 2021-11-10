import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();
let DB_URL = process.env.DB_CONNECTION;
export default async () => {
  if (process.env.NODE_ENV == 'test') {
    const mongod = await MongoMemoryServer.create();
    DB_URL = mongod.getUri();
  }
  return mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => console.log('Mongo successfully connected'))
    .catch((e) => console.error(e));
};
