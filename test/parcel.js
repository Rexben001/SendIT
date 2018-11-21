import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.should();

chai.use(chaiHttp);

describe('API route testing', () => {
	describe('POST /v1/parcels', () => {
		it('it should create a parcel', ((done) => {
			const parcel = {
				weight: 34.5,
				weightmetric:'kg',
				placedBy: 1,
				from: 'Idumota',
				to: 'Ipaja',
				receiver: 'John',
				currentLocation: 'Ketu',
				status: 'Delivered',
				phoneOfReceiver: '123456789',
			};
			chai.request(app)
				.post('/api/v1/parcels')
				.send(parcel)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					console.log(err);
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
		it('it should update the destination of a particular parcel', ((done) => {
			const parcelDestination = {
				destination: 'Igbe road',
			};
			chai.request(app)
				.put(`/api/v1/parcels/${1}/destination`)
				.send(parcelDestination)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.message.should.equal('Parcel updated successfully');
					done(err);
				});
		}));
	});
	describe('/PUT /v1/parcels:id/cancel', () => {
		it('It should change the status of the particular id', ((done) => {
			chai.request(app)
				.put(`/api/v1/parcels/${1}/cancel`)
				.end((err, res) => {
					res.should.have.status(201);
					done(err);
				});
		}));
	});
});
