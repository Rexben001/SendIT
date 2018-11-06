import Parcels from '../models/app';

function getParcels(req, res) {
	const id = parseInt(req.params.id, 10);

	Parcels.users.map((parcel) => {
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

}

function postParcels(req, res) {
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
}

module.exports = {
	getParcels, postParcels
};