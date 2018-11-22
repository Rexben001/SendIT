import value from '../models/userdb';
import bcrypt from 'bcrypt';

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

		const user = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			othernames: req.body.othernames,
			username: req.body.username,
			email: req.body.email,
			phone: req.body.phone,
			password: bcrypt.hash(req.body.password, 10),
			isAdmin: req.body.isAdmin,
			
		};
		pool.connect((err, client, done) => {
			const query = 'INSERT INTO users(firstname, lastname, othernames, username, email, phone, password, isAdmin, registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *';
			const values = [user.firstname, user.lastname, user.othernames, user.username, user.email, user.phone, user.password, user.isAdmin];

			client.query(query, values, (error, result) => {
				done();
				if (error) {
					return res.status(400).json({ error });
				}
				return res.status(200).send({
					status: 'Successful',
					result: result.rows,
				});
			});
		});
	}

	static loginUser(req, res) {
		const password = req.body.password;
		const data = req.body.name;
		pool.connect((err, client, done) => {
			const query = `SELECT * FROM users WHERE name=$1 AND password=$2`;
			const value = [data, password];
			client.query(query, value, (error, result) => {
				done();
				if(err){
					return res.status(400).json({ err });
				}
				if (error) {
					console.log(error);
					return res.status(400).json({ error });
				} else {
					return res.status(202).send({
						status: 'Successful',
						result: result,
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
					return res.status(400).json({
						result: "An error occurred",
						error,
					});
				} else
				if (result.rowCount === 0) {
					res.status(404).send({
						status: 'Failed',
						message: 'No users information found',
					});
				}
				return res.json({
					status: 'success',
					result: result.rows
				});
			});
		});
	}
}

export default UserController;
