import Users from '../models/dummyData/users';
import value from '../models/userdb';

const pool = value.pool;


class UserController {
	static getUsers(req, res) {
		pool.connect((err, client, done) => {
			const query = 'SELECT * FROM users';
			client.query(query, (error, result) => {
			  done();
			  if (error) {
				res.status(400).json({error})
			  } 
			  if(result.rows < '1') {
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
			name: req.body.name,
			email: req.body.email,
			country: req.body.country,
			phone: req.body.phone,
			password: req.body.password,
		};
		  pool.connect((err, client, done) => {
			const query = 'INSERT INTO users(name, email, country, phone, password) VALUES($1,$2,$3,$4,$5) RETURNING *';
			const values = [user.name, user.email, user.country, user.phone, user.password];
		
			client.query(query, values, (error, result) => {
			  done();
			  if (error) {
				return res.status(400).json({error});
			  }
			 return res.status(202).send({
				status: 'Successful',
				result: result.rows,
			  });
			});
		  });
	}

	static loginUser(req, res) {
		const name = req.body.name;
		const password = req.body.password;
        pool.connect((err, client, done) => {
			const query = 'SELECT * FROM users where name=$1 password=$2';
			const value = [name, password];
            client.query(query, value, (error, result) => {
              done();
              if (error) {
                return res.status(400).json({
					error,
				result: "Enter the correct details"
			});
              } 
              return  res.json({status: 'success',
			result: "Welcome to Send IT"
		});
          });
      });
	}


	static userParcel(req, res) {
		const id = Number(req.params.id);
		const user = Users.find(u => u.id === id);

		if (!user) {
			return res.status(404).json({
				message: 'user not found',
			});
		}

		return res.status(200).json({
			message: 'Parcel retrieved successfully',
			parcels: user.parcels,
		});
	}
}

export default UserController;
