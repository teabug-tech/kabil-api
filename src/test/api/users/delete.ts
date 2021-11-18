import { expect } from 'chai';
import { connect, disconnect } from '../../../db';
import * as dotenv from 'dotenv';
import request from 'supertest';
import userRouter from '../../../routes/userRoute';
import { IUserObject } from '../../../models/User';
import { ObjectId } from 'mongodb';

dotenv.config();

let id = 0;
describe('Delete /user', () => {
  before((done) => {
    connect()
      .then(() => {
        const user: IUserObject = {
          firstName: 'chi7ed',
          lastName: 'baz',
          gender: 'male',
          dialect: new ObjectId(),
          score: 10,
          role: 'admin',
          age: 18,
        };
        request(userRouter)
          .post('/')
          .send({ data: user })
          .then((res) => {
            id = res.body.message._id;
            done();
          });
      })
      .catch((e) => done(e));
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch(done);
  });

  it('Deletes a user', (done) => {
    request(userRouter)
      .delete('/')
      .send({ _id: id })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.success).to.be.true;
        expect(body.message).to.be.an('object');
        const user = body.message;
        expect(user).to.have.property('_id');
        expect(user._id).to.be.equal(id);
        done();
      })
      .catch(done);
  });
});
