import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/server';

chai.should();

chai.use(chaiHttp);

// describe('POST /api/v1/users/register', () => {
// 	it('it should add new user', ((done) => {
// 		const user = {
// 			name: 'Ben',
// 			email: 'rexben.rb@gmail.com',
// 			country: 'Abia',
// 			phone: '2345678',
// 			password: 'erft9876',
//         };
//         pool.connect((err, client, done) => {
// 			const query = 'INSERT INTO users(name, email, country, phone, password) VALUES($1,$2,$3,$4,$5) RETURNING *';
// 			const values = [user.name, user.email, user.country, user.phone, user.password];
// 			client.query(query, values, (error, result) => {
//                 done();
//             });
//         });
// 		chai.request(app)
// 			.post('/api/v1/users/register')
// 			.send(user)
// 			.end((err, res) => {
// 				res.should.have.status(200);
// 				res.body.should.be.a('Object');
// 				done(err);
// 			});
// 	}));
// });

// describe('GET /v1/users/:id/parcels', () => {
// 	it('it should get parcels from a user by its given id', ((done) => {
// 		chai.request(app)
// 			.get(`/api/v1/users/1/parcels`)
// 			.end((err, res) => {
// 				res.should.have.status(200);
// 				res.body.should.be.a('Object');
// 				done(err);
// 			});
// 	}));
// });

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



