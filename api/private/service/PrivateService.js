/* eslint-disable camelcase */
/* eslint-disable no-unreachable */
import db from '../../src/models';
import Helpers from '../../utils/helpers';

class PasswordService {

	static async getAdresses(req) {
		try {
			console.log(req.userId);

			const user = await db.User.findOne({
				[db.Sequelize.Op.or]: [
					{username: req.body.username},
					{email: req.body.email}
				],
				include: {
					model: db.Address,
					as: 'addresses'
				}
			});

			const addresses = user.addresses.map(address => {
				const { id, province, district, street, building_number, flat, apartment_number } = address;
				return { id, province, district, street, building_number, flat, apartment_number };
			});

			return Helpers.setSuccessJson('Addresses of user has successfully retrieved.', addresses);
		}
		catch (error) {
			throw error;
		}
	}

}

export default PasswordService;