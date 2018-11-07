import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('API route testing', () => {
	describe('POST /v1/parcels', () => {
		it('it should get all parcels', ((done) => {
			const parcel = {
				id: 2,
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
					res.should.have.status(201);
					res.body.should.be.a('Object');
					res.body.should.have.property('success').eql(true);
					res.body.parcel.should.have.property('picker').eql('dfgh');
					res.body.parcel.id.should.be.a('Number');
					done();
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
					res.body.parcel.should.have.length(1);
					res.body.success.should.equal(true);
					done();
				});
		}));
	});

	describe('GET /v1/parcels/:id', () => {
		it('it should get a parcel by its given id', ((done) => {
			chai.request(app)
				.get(`/api/v1/parcels/${2}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.success.should.equal(true);
					res.body.parcel.should.have.property('picker').eql('dfgh');
					res.body.parcel.id.should.be.a('Number');
					done();
				});
		}));

		it('it should return error 404', ((done) => {
			chai.request(app)
				.get(`/api/v1/parcels/${3}`)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.message.should.equal('parcel does not exist');
					res.body.success.should.equal(false);
					done();
				});
		}));
	});

	describe('POST /v1/users', () => {
		it('it should get all parcels', ((done) => {
			const user = {
				id: 2,
				name: 'Ben',
				email: 'rexben.rb@gmail.com',
				country: 'Abia',
				phone: '2345678',
				password: 'erft9876',
			};
			chai.request(app)
				.post('/api/v1/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('Object');
					res.body.should.have.property('success').eql(true);
					res.body.user.should.have.property('name').eql('Ben');
					res.body.parcel.id.should.be.a('Number');
					done();
				});
		}));
	});

	describe('GET /v1/users/:id/parcels', () => {
		it('it should get parcels from a user by its given id', ((done) => {
			chai.request(app)
				.get('/v1/users/1/parcels')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.success.should.equal(true);
					res.body.parcel.id.should.be.a('Number');
					done();
				});
		}));
	});

	describe('PUT /v1/parcels/:id/edit', () => {
		it('it should produce parcel updated successfully', ((done) => {
			const parcelDestination = {
				destination: 'Igbe road',
			};
			chai.request(app)
				.put('/v1/parcels/2/edit')
				.send(parcelDestination)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.success.should.equal(true);
					res.body.message.should.equal('Parcel updated successfully');
					res.body.parcel.destination.should.be.equal('Igbe road');
					done();
				});
		}));
	});
});
