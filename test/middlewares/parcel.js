import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../middlewares/server';

chai.should();

chai.use(chaiHttp);

describe('API route testing', () => {
	describe('POST /v1/parcels', () => {
		it('it should get all parcels', ((done) => {
			const parcel = {
				id: 1,
				weight: '232.6',
				username: 'seyi',
				emailAddress: 'rexben.rb@gmail.com',
				pickup: '10, Igbe, Lagos',
				phone: '345678',
				picker: 'dfgh',
				emailOfPicker: 'ertyui',
				phoneOfPicker: '345678',
				destination: 'ghjktr',
				status: 'delivered',
			};
			chai.request(app)
				.post('/api/v1/parcels')
				.send(parcel)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.parcel.should.have.property('picker').eql('dfgh');
					res.body.parcel.id.should.be.a('Number');
					done(err);
				});
		}));
	});

	describe('GET /v1/parcels', () => {
		it('it should get all parcels', ((done) => {
			chai.request(app)
				.get('/api/v1/parcels')
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

		it('it should return error 400', ((done) => {
			chai.request(app)
				.get(`/api/v1/parcels/${3}`)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.message.should.equal('parcel not found');
					done(err);
				});
		}));
	});
	describe('PUT /v1/parcels/:id/edit', () => {
		it('it should produce parcel updated successfully', ((done) => {
			const parcelDestination = {
				destination: 'Igbe road',
			};
			chai.request(app)
				.put(`/api/v1/parcels/${1}/edit`)
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
