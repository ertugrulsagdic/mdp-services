/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

export default class Helpers {

	static getFileRoute(filename) {

		const string = filename.split('.')[0].split('Route')[0].toLowerCase();
		return string;
	
	}

	static setSuccessJson(message, data) {
		return {
			type: true,
			message: message,
			data: data
		};
	}

	static setFailJson(message, data){
		return {
			type: false,
			message: message,
			data: data
		};
	}

}
