

import supertest from 'supertest';
import chai from 'chai';
import should from 'should';
import app from '../app.js'

let server = supertest.agent("http://localhost:3000");


let expect = chai.expect;
let request = supertest(app);

describe('GET /v1/parcels', () => {

	it('it should get all parcels', ((done) => {
		server.get("/api/v1/parcels")
			.expect('Content-type', /json/)
			.expect(200)
			.end((err, res) => {
				res.status.should.equal(200);
				res.body.error.should.equal(false);
				done();
			});
	}));

});
