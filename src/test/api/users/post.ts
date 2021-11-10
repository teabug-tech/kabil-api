import { expect, use } from 'chai';
import { connect, disconnect } from '../../../db';
import * as dotenv from 'dotenv';
import request from 'supertest';
import userRouter from '../../../routes/userRoute';
import { IUserObject } from '../../../models/User';
import { ObjectId } from 'mongodb';

dotenv.config();

describe('POST /users', () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch((e) => done(e));
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch((e) => done(e));
  });

  it('Creating a new user', (done) => {
    const user: IUserObject = {
      firstName: 'taha',
      lastName: 'baz',
      gender: 'age',
      dialect: new ObjectId(),
      score: 10,
      role: 'admin',
      age: 18,
    };

    request(userRouter)
      .post('/')
      .send(user)
      .then((res) => {
        const body = res;
        console.log(body);
        done();
      })
      .catch((e) => done(e));
  });
});
