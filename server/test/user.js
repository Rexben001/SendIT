import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.should();

chai.use(chaiHttp);

describe('POST /api/v1/users/auth/signup', () => {
  it('it should add new user', ((done) => {
    const user = {
      firstname: 'Beeen',
      lastname: 'Johne',
      othernames: 'Ben Thom',
      email: 'rexben.rb@gmail.com',
      country: 'Abia',
      phone: '2345678',
      password: 'erft987kl6',
      is_admin: false,
      username: 'Lovee'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done(err);
      });
  }));
});

describe('GET /v1/users/:id/parcels', () => {
  it('it should get parcels from a user by its given id', ((done) => {
    chai.request(app)
      .get('/api/v1/users/1/parcels')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done(err);
      });
  }));
});

describe('GET /v1/users', () => {
  it('it should get all users', ((done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done(err);
      });
  }));
});
