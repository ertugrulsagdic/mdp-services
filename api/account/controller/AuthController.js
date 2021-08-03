/**
 * @typedef SignupUserRequest
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {array<PhoneNumber>} phone_numbers
 * @property {array<Address>} addresses
 */

/**
 * @typedef PhoneNumber
 * @property {string} phone_number
 */

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
 * @typedef LoginUserRequest
 * @property {string} username
 * @property {string} password
 */
import AuthService from '../service/AuthService';
import Util from '../../utils/utils';
import { signupUserRequestValidation, loginUserRequestValidation} from '../validations/AuthValidations';

const util = new Util();

class AuthController {

	/**
	 * @route POST /account/v1/Auth/Signup
	 * @group Account/Auth
	 * @summary Signs the new user in with proper request body
	 * @param {SignupUserRequest.model} body.body 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async signupUser(req, res){
		try {
			const requestBodyValidation = signupUserRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await AuthService.signupUser(req);
			if (!result.type){
				util.setError(200, result.message);
				return util.send(res);
			}

			util.setSuccess(200, result.message);
			return util.send(res);
		}
		catch (error) {
			console.log(error);
			util.setError(400, error.message);
			return util.send(res);  
		}
	}

	/**
	 * @route POST /account/v1/Auth/Login
	 * @group Account/Auth
	 * @summary Logs the user in with proper request body
	 * @param {LoginUserRequest.model} body.body 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async loginUser(req, res){
		try {
			const requestBodyValidation = loginUserRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await AuthService.loginUser(req);

			if (!result.type) {
				util.setError(400, result.message);
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

export default AuthController;