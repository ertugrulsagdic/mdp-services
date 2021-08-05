/* eslint-disable camelcase */
/* eslint-disable no-unreachable */
import db from '../../src/models';
import Helpers from '../../utils/Helpers';

class PasswordService {

	static async getAdresses(req) {
		try {
			console.log(req.userId);

			const addresses = await db.Address.findAll({
				where: {
					user_id: req.userId
				},
				attributes: [ 'id', 'province', 'district', 'street', 'building_number', 'flat', 'apartment_number' ]
			});

			return Helpers.setSuccessJson('Addresses of user has successfully retrieved.', addresses);
		}
		catch (error) {
			throw error;
		}
	}

	static async addAddressesAtOnce(req) {
		try {
			console.log(req.body);
			const result = await db.Address.bulkCreate(
				req.body.addresses.map(address => ({...address, user_id: req.userId}))
			);

			console.log(result);
			return Helpers.setSuccessJson('Addresses of user has successfully added.');
		}
		catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async addAddressesRabbitMQ(req) {
		try {
			return Helpers.setSuccessJson('Addresses of user has successfully added.');
		}
		catch (error) {
			throw error;
		}
	}

}

export default PasswordService;