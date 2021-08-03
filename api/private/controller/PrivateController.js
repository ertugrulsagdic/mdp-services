import PrivateService from '../service/PrivateService';
import Util from '../../utils/utils';
 
const util = new Util();
 
class PrivateController {
 
	/**
	 * @route GET /private/v1/Private/Address
	 * @group Private
	 * @summary Gets the addresses of user provided with user token
	 * @returns {object} 200 - Success message
	 * @returns {Error} default - Unexpected error
	 */
	static async getAddresses(req, res){
		try {
			const result = await PrivateService.getAdresses(req);
			if (!result.type){
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
 
}
 
export default PrivateController;