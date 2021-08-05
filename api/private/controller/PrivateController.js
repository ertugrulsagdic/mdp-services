/**
 * @typedef Address
 * @property {string} province
 * @property {string} district
 * @property {string} street
 * @property {integer} building_number
 * @property {integer} flat
 * @property {integer} apartment_number
 */

/**
 * @typedef AddAddressesAtOnceRequest
 * @property {array<Address>} addresses
 */

/**
 * @typedef AddAddressesRabbitMQRequest
 * @property {array<Address>} addresses
 */

import PrivateService from '../service/PrivateService';
import Util from '../../utils/utils';
import { addAddressesRequestValidation } from '../validations/PrivateValidations';

const util = new Util();

class PrivateController {

	/**
	 * @route GET /private/v1/Private/Address
	 * @group Private/Private
	 * @summary Gets the addresses of user provided with user token
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getAddresses(req, res) {
		try {

			const result = await PrivateService.getAdresses(req);

			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}

			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error) {
			console.log(error);
			util.setError(400, error.message);
			return util.send(res);
		}
	}

	/**
	 * @route POST /private/v1/Private/Add/Addresses/At/Once
	 * @group Private/Private
	 * @summary Adds the addresses of User at once using sequelize function
	 * @param {AddAddressesAtOnceRequest.model} body.body 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async addAddressesAtOnce(req, res) {
		try {
			const requestBodyValidation = addAddressesRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await PrivateService.addAddressesAtOnce(req);

			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}

			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error) {
			util.setError(400, error.message);
			return util.send(res);
		}
	}

	/**
	 * @route POST /private/v1/Private/Add/Addresses/RabbitMQ
	 * @group Private/Private
	 * @summary Adds the addresses of User using RabbitMQ queueing
	 * @param {AddAddressesRabbitMQRequest.model} body.body 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async addAddressesRabbitMQ(req, res) {
		try {
			const requestBodyValidation = addAddressesRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await PrivateService.addAddressesRabbitMQ(req);
	
			if (!result.type) {
				util.setError(200, result.message);
				return util.send(res);
			}
	
			util.setSuccess(200, result.message, result.data);
			return util.send(res);
		}
		catch (error) {
			util.setError(400, error.message);
			return util.send(res);
		}
	}

}

export default PrivateController;