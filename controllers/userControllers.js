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
		if (!req.body) {
			res.status(400).json({
				message: 'invalid data',
			});
		}
		Users.push(user);
		res.status(200).json({
			message: 'created a new parcel',
			data: user,
		});
	}

	static userParcel(req, res) {
		const { id } = req.body;
		Users.map((user) => {
			if (user.id === id) {
				return res.status(200).json({
					message: 'Parcel retrieved successfully',
					parcels: user.parcels,
				});
			}
			return res.status(400).json({
				message: 'user not found',
			});
		});
	}
}

export default UserController;
