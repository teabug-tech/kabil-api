import { expect } from 'chai';
import request from 'supertest';
import { connect, disconnect } from '../../../db';
import userRouter from '../../../routes/userRoute';
import * as dotenv from 'dotenv';

dotenv.config();
let id = '6196283965516a598da99848';
let userToken;

describe('/GET /users', () => {
  before((done) => {
    connect()
      .then(() => {
        if (process.env.NODE_ENV == 'production') return done();

        const user = {
          email: 'sone@email.com',
          firstName: 'taha',
          lastName: 'baz',
          gender: 'male',
          dialect: 'mrrakchi',
          score: 10,
          role: 'user',
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
              .send({ user: { email: 'sone@email.com', password: '123456' } })
              .then((res) => {
                userToken = res.header['set-cookie'][0].split(';')[0].split('=')[1];
              });
            done();
          });
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
      .set('Authorization', 'Bearer ' + process.env.adminToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        done();
      })
      .catch(done);
  });

  it('Gets by filter', (done) => {
    request(userRouter)
      .get('/')
      .set('Authorization', 'Bearer ' + process.env.adminToken)
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
      })
      .catch(done);
  });

  it('Gets by id', (done) => {
    request(userRouter)
      .get(`/${id}`)
      .set('Authorization', 'Bearer ' + userToken)
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
        done();
      })
      .catch(done);
  });

  it('Should not get anything', (done) => {
    request(userRouter)
      .get(`/${0}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('message');
        expect(body).to.have.property('success');
        expect(body.success).to.be.false;
        done();
      });
  });
});
