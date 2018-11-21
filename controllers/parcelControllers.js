import value from '../models/parcelsdb';

const pool = value.pool;


class ParcelController {
	static getParcels(req, res) {
		pool.connect((err, client, done) => {
			const query = 'SELECT * FROM parcels';
			client.query(query, (error, result) => {
				done();
				if (error) {
					res.status(400).json({ error })
				}
				if (result.rows < '1') {
					res.status(404).send({
						status: 'Failed',
						message: 'No parcels information found',
					});
				} else {
					res.status(200).send({
						status: 'Successful',
						message: 'parcels Information retrieved',
						parcels: result.rows,
					});
				}
			});
		});;
	}
	static addParcelss(req, res) {


		const parcel = {
			weight: req.body.weight,
			username: req.body.username,
			emailAddress: req.body.emailAddress,
			pickup: req.body.pickup,
			phone: req.body.phone,
			picker: req.body.picker,
			emailOfPicker: req.body.emailOfPicker,
			phoneOfPicker: req.body.phoneOfPicker,
			destination: req.body.destination,
			status: req.body.status,
			presentLocation: req.body.presentLocation,
			user_id: req.body.user_id,
		};

		pool.connect((err, client, done) => {
			const query = 'INSERT INTO parcels(weight, username, emailAddress, pickup, phone, picker, emailOfPicker, phoneOfPicker, destination, status, presentLocation, user_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *';
			const values = [parcel.weight, parcel.username, parcel.emailAddress, parcel.pickup, parcel.phone, parcel.picker, parcel.emailOfPicker, parcel.phoneOfPicker, parcel.destination, parcel.status, parcel.presentLocation, parcel.user_id];

			client.query(query, values, (error, result) => {
				done();
				if (error) {
					return res.status(400).json({ error });
				}
				return res.status(202).send({
					status: 'Successful',
					result: result.rows,
				});
			});
		});

	}

	static getAParcel(req, res) {
		const id = req.params.parcel_id;
		pool.connect((err, client, done) => {
			const query = `SELECT * FROM parcels where parcel_id=${id}`;
			client.query(query, (error, result) => {
				done();
				if (error) {
					res.status(400).json({ error })
				}
				res.json({
					status: 'success',
					result: result.rows
				});
			});
		});
	}

	static changeDestination(req, res) {
		const id = req.params.parcel_id;
		const data = req.body.destination;
		pool.connect((err, client, done) => {
			const query = (`UPDATE parcels SET destination=$1 WHERE parcel_id=$2`);
			const value = [data, id];
			client.query(query, value, (error, result) => {
				done();
				if (error) {
					console.log(error);
					return res.status(400).json({ error });
				}
				return res.status(202).send({
					status: 'Successful',
					result: result,
				});
			});
		});
	}

	static changeStatus(req, res) {
		const id = req.params.parcel_id;
		const data = req.body.status;
		pool.connect((err, client, done) => {
			const query = (`UPDATE parcels SET status=$1 WHERE parcel_id=$2`);
			const value = [data, id];
			client.query(query, value, (error, result) => {
				done();
				if (error) {
					return res.status(400).json({ error });
				}
				return res.status(202).send({
					status: 'Successful',
					result: result,
				});
			});
		});
	}
	static cancelParcel(req, res) {
		const id = req.params.parcel_id;
		pool.connect((err, client, done) => {
			const query = (`DELETE parcels WHERE parcel_id=${id}`);
			client.query(query, (error, result) => {
				done();
				if (error) {
					console.log(error);
					return res.status(400).json({ error });
				}
				return res.status(202).send({
					status: 'Successful',
					result: result,
				});
			});
		});
	}
	static presentLocation(req, res) {
		const id = req.params.parcel_id;
		const data = req.body.presentLocation;
		pool.connect((err, client, done) => {
			const query = (`UPDATE parcels SET presentLocation=$1 WHERE parcel_id=$2`);
			const value = [data, id];
			client.query(query, value, (error, result) => {
				done();
				if (error) {
					console.log(error);
					return res.status(400).json({ error });
				}
				return res.status(202).send({
					status: 'Successful',
					result: result,
				});
			});
		});
	}
}

export default ParcelController;
