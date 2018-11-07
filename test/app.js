import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'



let should = chai.should();

chai.use(chaiHttp);



describe('API route testing', () => {

	describe('POST /v1/parcels', () => {

		it('it should get all parcels', ((done) => {
			let parcel = {
				"id": 2,
				"weight": "232.6",
				"username": "seyi",
				"emailAddress": "rexben.rb@gmail.com",
				"pickup": "10, Igbe, Lagos",
				"phone": "345678",
				"picker": "dfgh",
				"emailOfPicker": "ertyui",
				"phoneOfPicker": "345678",
				"destination": "ghjktr",
				"status": "delivered"

			}
			chai.request(app)
				.post("/api/v1/parcels")
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
				.get("/api/v1/parcels")
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
				.get("/api/v1/parcels/" + 2)
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
				.get("/api/v1/parcels/" + 3)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.message.should.equal('parcel does not exist');
					res.body.success.should.equal(false);
					done();
				});
		}));

	});

	describe('GET /v1/users/:id/parcels', () => {

		it('it should get parcels from a user by its given id', ((done) => {
			chai.request(app)
				.get("/v1/users/1/parcels")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.success.should.equal(true);
					res.body.parcel.id.should.be.a('Number');
					done();
				});
		}));
	});

	describe('PUT /v1/parcels/:id', () => {

		it('it should produce an error, parcel not found', ((done) => {
			chai.request(app)
				.put("/api/v1/parcels/3/cancel")
				.end((err, res) => {
					res.should.have.status(404);
					res.body.success.should.equal(false);
					res.body.message.should.equal('parcel not found');
					done();
				});
		}));

		it('it should cancel a parcel by its given id', ((done) => {
			chai.request(app)
				.put("/api/v1/parcels/2/cancel")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.message.should.equal('Parcel cancelled successfully');
					done();
				});
		}));
	});


});