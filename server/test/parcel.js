import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.should();

chai.use(chaiHttp);

describe('API route testing', () => {
  describe('POST /v1/parcels', () => {
    it('it should create a parcel', ((done) => {
      const parcel = {

        weight: 34,
        username: 'Ben',
        weightmetric: 'rexben.rb@gmail.com',
        from_address: 'Igbe',
        to_address: 'James',
        emailOfPicker: 'rex@gmail.com',
        phoneOfReceiver: '2345678',
        receiver: 'Anthony',
        status: 'Delivered',
        currenttLocation: 'VI',
        placedBy: 1,
        isAdmin: false
      };
      chai.request(app)
        .post('/api/v1/parcels')
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done(err);
        });
    }));
  });

  describe('GET /v1/parcels', () => {
    it('it should get all parcels', ((done) => {
      chai.request(app)
        .get('/api/v1/parcels/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done(err);
        });
    }));
  });

  describe('GET /v1/parcels/:id', () => {
    it('it should get a parcel by its given id', ((done) => {
      chai.request(app)
        .get(`/api/v1/parcels/${1}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done(err);
        });
    }));
  });
  describe('PUT /v1/parcels/:id/destination', () => {
    it('it should produce parcel updated successfully', ((done) => {
      const parcelDestination = {
        to_address: 'Igbe road',
      };
      chai.request(app)
        .put(`/api/v1/parcels/${1}/destination`)
        .send(parcelDestination)
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    }));
  });
  describe('PUT /v1/parcels/:parcel_id/presentLocation', () => {
    it('it should produce parcel updated successfully', ((done) => {
      const currenttLocation = {
        to_address: 'Mile 12',
      };
      chai.request(app)
        .put(`/api/v1/parcels/${1}/presentLocation`)
        .send(currenttLocation)
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    }));
  });
  describe('/PUT /v1/parcels:id/cancel', () => {
    it('It should change the status of the particular id', ((done) => {
      chai.request(app)
        .put(`/api/v1/parcels/${1}/cancel`)
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    }));
  });
});
