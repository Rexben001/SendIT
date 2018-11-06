import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
}));
app.use(bodyParser.json());


//	Get all the delivery order parcels
router.get('/v1/parcels', (req, res) => {
	db.users.map((parcel) => {
		return res.status(200).send({
			success: true,
			message: 'user retrieved successfully',
			parcel: parcel.parcels
		});
	});
});

//Create a delivery order parcel
router.post('/v1/parcels', (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			success: false,
			message: 'Enter the fields correctly'
		});
	}

	const parcel = {
		id: req.body.id,
		weight: req.body.weight,
		username: req.body.username,
		emailAddress: req.body.emailAddress,
		pickup: req.body.pickup,
		phone: req.body.phone,
		picker: req.body.picker,
		emailOfPicker: req.body.emailOfPicker,
		phoneOfPicker: req.body.phoneOfPicker,
		destination: req.body.destination,
		status: req.body.status

	}
	db.users.map((singleParcels) => {
		singleParcels.parcels.push(parcel);
	});
	return res.status(201).send({
		success: true,
		message: 'user created successsfully',
		parcel: parcel

	});
});

//Get a particular delivery order parcel
router.get('/v1/parcels/:id', (req, res) => {

	const id = parseInt(req.params.id, 10);
	db.users.map((parcel) => {
		parcel.parcels.map((parcel) => {
			if (parcel.id == id) {
				return res.status(200).send({
					success: true,
					message: 'user retrieved successfully',
					parcel: parcel
				});
			}

		});
	});
	return res.status(404).send({
		success: false,
		message: 'user does not exist'
	});
});

//Cancel a particular delivery order parcel
router.put('/v1/parcels/:id/cancel', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.users.map((parcel) => {
		parcel.parcels.map((singleParcel, index) => {
			if (singleParcel.id == id) {
				parcel.parcels.splice(index, 1);
				return res.status(200).send({
					success: true,
					message: 'Parcel cancelled successfully'
				});
			}
		});

	});

	return res.status(404).send({
		success: false,
		message: 'parcel not found'
	});
});

router.get('/v1/users/:id/parcels', (req, res) => {

	const id = parseInt(req.params.id, 10);

	db.users.map((parcel) => {
		if (parcel.id == id) {
			return res.status(200).send({
				success: true,
				message: 'user retrieved successfully',
				user: parcel
			});
		}
	});
	return res.status(404).send({
		success: false,
		message: 'user does not exist'
	});
});

router.put('/v1/parcels/:id/edit', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.users.map((parcel) => {
		parcel.parcels.map((singleParcel) => {
			if (singleParcel.id == id) {

				singleParcel.destination = req.body.destination || singleParcel.destination;
				return res.status(201).send({
					success: true,
					message: 'Parcel updated successfully',
					parcel: singleParcel
				});
			}

		});
	});




	return res.status(404).send({
		success: false,
		message: 'parcel not found'
	});
});

app.use('/api', router);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
});