import validate from 'node-input-validator';
import Users from '../models/users';

class UserController {
	static getUsers(req, res) {
		return res.status(200).json({
			message: 'List of all parcels',
			parcels: Users,
		});
	}

	static addUser(req, res) {
		
		const user = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			country: req.body.country,
			phone: req.body.phone,
			pasword: req.body.pasword,
			parcels: [],
		};
			Users.push(user);
			return res.status(200).json({
				message: 'created a new parcel',
				data: user,
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
