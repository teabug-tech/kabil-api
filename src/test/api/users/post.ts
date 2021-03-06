import { expect } from 'chai';
import { connect, disconnect } from '../../../db';
import * as dotenv from 'dotenv';
import request from 'supertest';
import userRouter from '../../../routes/userRoute';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

dotenv.config();

let id = 0;
describe('POST /users', () => {
  before((done) => {
    connect()
      .then(() => done())
      .catch(done);
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch(done);
  });

  it('Creates a new user', (done) => {
    if (process.env.NODE_ENV == 'production') return done();
    const user = {
      firstName: 'taha',
      lastName: 'baz',
      gender: 'male',
      dialect: 'darija',
      score: 10,
      role: 'admin',
      age: 18,
      password: '123456',
      email: 'someemail',
    };

    request(userRouter)
      .post('/')
      .send({ data: user })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.success).to.be.true;
        expect(body.message).to.have.keys('role', '_id');
        id = body.message._id;
        done();
      })
      .catch(done);
  });

  it('Should not create a new user', (done) => {
    if (process.env.NODE_ENV == 'production') return done();
    const user = {
      _id: id,
      firstName: 'taha',
      lastName: 'baz',
      gender: 'male',
      dialect: 'darija',
      score: 10,
      role: 'admin',
      age: 18,
      email: 'someemail',
      password: '123456',
    };

    request(userRouter)
      .post('/')
      .send({ data: user })
      .expect('Content-Type', /json/)
      .expect(409)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.success).to.be.false;
        done();
      })
      .catch(done);
  });
});
