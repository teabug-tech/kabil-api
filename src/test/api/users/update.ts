import { expect } from 'chai';
import { connect, disconnect } from '../../../db';
import * as dotenv from 'dotenv';
import request from 'supertest';
import userRouter from '../../../routes/userRoute';

dotenv.config();

let userToken;

let id = 0;
describe('Update /user', () => {
  before((done) => {
    connect()
      .then(() => {
        const user = {
          email: 'chi@email.com',
          firstName: 'chi7ed',
          lastName: 'baz',
          gender: 'male',
          dialect: 'chi dielaect',
          score: 10,
          age: 18,
          password: '123456',
        };
        request(userRouter)
          .post('/')
          .send({ data: user })
          .then((res) => {
            id = res.body.message._id;
            request(userRouter)
              .post('/login')
              .send({ user: { email: 'chi@email.com', password: '123456' } })
              .then((res) => {
                userToken = res.header['set-cookie'][0].split(';')[0].split('=')[1];
                done();
              });
          });
      })
      .catch((e) => done(e));
  });

  after((done) => {
    disconnect()
      .then(() => done())
      .catch(done);
  });

  it('Updates a user', (done) => {
    const data = {
      firstName: 'newname',
    };
    request(userRouter)
      .put('/')
      .set('Authorization', 'Bearer ' + userToken)
      .send({ data, filter: { id: id }, options: { new: true } })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.message).to.be.an('object');
        const user = body.message;
        expect(user).to.have.property('_id');
        expect(user._id).to.be.equal(id);
        expect(user.firstName).to.be.equal(data.firstName);
        done();
      })
      .catch(done);
  });

  it('Should not update a user', (done) => {
    const data = {
      firstName: 'newname',
    };
    request(userRouter)
      .put('/')
      .send({ data, filter: { _id: 0 } })
      .expect('Content-Type', /json/)
      .expect(404)
      .then(() => {
        done();
      })
      .catch(done);
  });
});
