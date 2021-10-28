import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
export default () =>
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => console.log('Mongo successfully connected'))
    .catch((e) => console.error(e));
