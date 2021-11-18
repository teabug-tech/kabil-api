import { expect } from 'chai';
import { ObjectId } from 'mongodb';
import request from 'supertest';
import { connect, disconnect } from '../../../db';
import { IUserObject } from '../../../models/User';
import userRouter from '../../../routes/userRoute';

describe('/GET /users', () => {
  before((done) => {
    connect()
      .then(() => {
        const user: IUserObject = {
          firstName: 'taha',
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
          .then(() => done());
      })
      .catch((e) => done(e));
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch((e) => done(e));
  });
  it('Gets all the users', (done) => {
    request(userRouter)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        done();
      });
  });

  it('Gets by filter', (done) => {
    request(userRouter)
      .get('/')
      .query({ name: 'taha' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.message).to.be.an('array');
        const user = body.message[0];
        expect(user).to.have.property('firstName');
        expect(user.firstName).to.be.equal('taha');
        done();
      });
  });
});
