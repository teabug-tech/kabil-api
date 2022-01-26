import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();
let DB_URL = process.env.DB_CONNECTION;
export const connect = async () => {
  if (process.env.NODE_ENV == 'test') {
    console.log('TESTING MODE');
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

export const disconnect = () => {
  return mongoose.disconnect();
};
