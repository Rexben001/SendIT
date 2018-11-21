import value from '../models/parcelsdb';

const pool = value.pool;


class ParcelController {
	static getParcels(req, res) {
		pool.connect((err, client, done) => {
			const query = 'SELECT * FROM parcels';
			client.query(query, (error, result) => {
				done();
				if (error) {
					res.json({ error })
				}
				if (result.rows < '1') {
					res.json({
						status: 404,
						data: 'No parcels information found',
					});
				} else {
					res.json({
						status: 200,
						message: 'parcels Information retrieved',
						data: result.rows,
					});
				}
			});
		});;
	}
	static addParcelss(req, res) {
		const { weight, placedBy, weightmetric, from_address, to_address, receiver, status, phoneOfReceiver } = req.body;
		
		const parcel = {
			weight,
			placedBy,
			weightmetric,
			from_address,
			to_address,
			receiver,
			status,
			phoneOfReceiver,
		};

		pool.connect((err, client, done) => {
			const query = 'INSERT INTO parcels(weight, weightmetric, from_address, to_address, receiver, status, phoneOfReceiver,  placedBy) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
			const values = [parcel.weight, parcel.weightmetric, parcel.from_address, parcel.to_address, parcel.receiver, parcel.status, parcel.phoneOfReceiver, parcel.placedBy];

			client.query(query, values, (error, result) => {
				done();
				if (error) {
					return res.json({ error });
				}
				return res.json({
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
					res.json({ error })
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
		const data = req.body.to_address;
		console.log(id, data);
		pool.connect((err, client, done) => {
			const query = (`UPDATE parcels SET to_address=$1 WHERE parcel_id=$2`);
			const value = [data, id];
			client.query(query, value, (error, result) => {
				done();
				if (error) {
					return res.json({ error });
				}
				return res.status(201).json({
					status: 'Successful',
					result: result,
					message: 'Parcel updated successfully',
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
					return res.json({ error });
				}
				return res.status(202).json({
					status: 'Successful',
					result: result,
				});
			});
		});
	}
	static cancelParcel(req, res) {
		const id = req.params.parcel_id;
		pool.connect((err, client, done) => {
			const query = `DELETE FROM parcels WHERE parcel_id=${id}`;
			client.query(query, (error, result) => {
				done();
				if (error) {
					return res.json({ error });
				}
				return res.json({
					status: 200,
					data: {
						id,
						message: 'order canceled',
					}
				});
			});
		});
	}
	static presentLocation(req, res) {
		const id = req.params.parcel_id;
		const data = req.body.currentLocation;
		pool.connect((err, client, done) => {
			const query = (`UPDATE parcels SET currentLocation=$1 WHERE parcel_id=$2`);
			const value = [data, id];
			client.query(query, value, (error, result) => {
				done();
				if (error) {
					return res.json({ error });
				}
				return res.status(202).json({
					status: 'Successful',
					result: result,
				});
			});
		});
	}
}

export default ParcelController;
