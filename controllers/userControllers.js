import value from '../models/userdb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pool = value.pool;


class UserController {
	static getUsers(req, res) {
		pool.connect((err, client, done) => {
			const query = 'SELECT * FROM users';
			client.query(query, (error, result) => {
				done();
				if (error) {
					res.status(400).json({ error })
				}
				if (result.rows < '1') {
					res.status(404).send({
						status: 'Failed',
						message: 'No users information found',
					});
				} else {
					res.status(200).send({
						status: 'Successful',
						message: 'Users Information retrieved',
						users: result.rows,
					});
				}
			});
		});
	}


	static addUser(req, res) {

		bcrypt.hash(req.body.password, 10, (err, hash) => {

			if (err) {
				return res.json({
					message: 'Unable to hash password'
				})
			}
			const { firstname, lastname, othernames, username, email, phone, is_admin } = req.body;
			const user = {
				firstname,
				lastname,
				othernames,
				username,
				email,
				phone,
				password: hash,
				is_admin,

			};
			pool.connect((err, client, done) => {
				const query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, is_admin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *';
				const values = [user.firstname, user.lastname, user.othernames, user.username, user.email, user.phone, user.password, user.is_admin];

				client.query(query, values, (error, result) => {
					done();
					if (error) {
						return res.status(400).json({ error });
					} else {
						console.log(result.rows[0].is_admin)
						const payload = {
							id: result.rows[0].user_id,
						}
						jwt.sign(payload, 'ertyuio', (err, token) => {
							res.json({
								status: 200,
								result: 'Success',
								token
							})
						});
				  
						
					}
				});
			});
		})

	}

	static loginUser(req, res) {
		const password = req.body.password;
		const data = req.body.username;
		pool.connect((err, client, done) => {
			const query = `SELECT * FROM users WHERE username=$1`;
			const value = [data];
			client.query(query, value, (error, result) => {
				done();
				if (result.rowCount === 0) {
					return res.json({
						message: 'Pls, enter a valid username'
					});

				}
				else {
					bcrypt.compare(password, result.rows[0].password, (err, hash) => {
						if (hash === false) {
							return res.json({
								message: "Invalid password",
							})
						}
						if (err) {
							return res.json({ err });
						}
						if (error) {
							return res.json({ error });
						} else {

							return res.status(200).send({
								status: 'Successful',
								result: 'Welcome'
							});

						}
					});

				}
			});
		});
	}




	static userParcel(req, res) {
		const id = req.params.user_id;
		pool.connect((err, client, done) => {
			const query = `SELECT * FROM parcels WHERE user_id=${id}`;
			client.query(query, (error, result) => {
				done();
				if (error) {
					return res.json({
						result: "An error occurred",
						error,
					});
				} else {
					if (result.rowCount === 0) {
						return res.json({
							status: 'Failed',
							message: 'No users information found',
						});
					}
					return res.json({
						status: 'success',
						result: result.rows
					});
				}
			});
		});
	}
}



export default UserController;
