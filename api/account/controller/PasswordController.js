/**
 * @typedef ForgotPasswordRequest
 * @property {string} email
 */

/**
 * @typedef ResetPasswordRequest
 * @property {string} password
 */

import PasswordService from '../service/PasswordService';
import Util from '../../utils/utils';
import { forgotPasswordRequestValidation, resetPasswordRequestValidation } from '../validations/PasswordValidations';

const util = new Util();

class PasswordController {

	/**
	 * @route POST /account/v1/Password/Forgot
	 * @group Account/Password
	 * @summary Sends the user reset email with proper request body
	 * @param {ForgotPasswordRequest.model} body.body 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async forgotPassword(req, res){
		try {
			const requestBodyValidation = forgotPasswordRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await PasswordService.forgotPassword(req);

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
	 * @route POST /account/v1/Password/Reset/{token}
	 * @group Account/Password
	 * @summary Resets the user password with proper request body
	 * @param {ResetPasswordRequest.model} body.body 
	 * @param {string} token.path 
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async resetPassword(req, res){
		try {
			const requestBodyValidation = resetPasswordRequestValidation(req);

			if (!requestBodyValidation.type) {
				util.setError(200, requestBodyValidation.message);
				return util.send(res);
			}

			const result = await PasswordService.resetPassword(req);
           
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

export default PasswordController;