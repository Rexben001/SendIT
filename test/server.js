import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/server';

chai.should();

chai.use(chaiHttp);

describe('GET /', () => {
	it('it should return Send It API', ((done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('Object');
				done(err);
			});
	}));
});
