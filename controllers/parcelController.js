import validate from 'node-input-validator'
import Parcels from '../models/parcels';

class ParcelController {
	static getParcels(req, res) {
		return res.json({
			message: 'List of all parcels',
			parcels: Parcels,
		});
	}

	static createParcels(req, res) {
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
			status: req.body.status,
		};
		// let validator = new validate( req.body, {
		// 	id: 'required|integer',
		// 	weight: 'required|integer',
		// 	username: 'required|minLength:3',
		// 	emailAddress:'required|email',
		// 	pickup: 'required|string',
		// 	phone: 'required|numeric',
		// 	picker: 'required|string',
		// 	emailOfPicker: 'required|email',
		// 	phoneOfPicker: 'required|numeric',
		// 	destination: 'required|string',
		// 	});
	 
		// validator.check().then(function (matched) {
		// 	if (!matched) {
		// 		return res.status(422).json(validator.errors);
		// 	}
			Parcels.push(parcel);
			return res.status(200).json({
				message: 'created a new parcel',
				data: parcel,
			});

	}
	static getAParcel(req, res) {
		const id = Number(req.params.id);
		const parcel = Parcels.find(p => p.id == id);
		if (!parcel) {
			return res.status(400).json({
				message: 'parcel not found',
			});
		}

		return res.status(200).json({
			message: 'Parcel retrieved successfully',
			parcels: Parcels,
		});
	}

	static editParcel(req, res) {
		const id = Number(req.params.id);
		Parcels.find((parcel) => {
			if (parcel.id === id) {
				const singleParcel = Object.assign({}, parcel);
				singleParcel.destination = req.body.destination || singleParcel.destination;
				
				return res.status(201).json({
					success: true,
					message: 'Parcel updated successfully',
					parcels: parcel,
				});
			}
			return res.status(400).json({
				message: 'parcel not found',
			});
		});
	}

	static cancelParcel(req, res) {
		const id = parseInt(req.params.id, 10);
		Parcels.find((parcel) => {
			if (parcel.id === id) {
				const singleParcel = Object.assign({}, parcel);
				singleParcel.status = req.body.status || singleParcel.status;
				return res.status(201).json({
					success: true,
					message: 'Parcel updated successfully',
					parcels: parcel,
				});
			}
			return res.status(400).json({
				message: 'parcel not found',
			});
		});
	}
}

export default ParcelController;
