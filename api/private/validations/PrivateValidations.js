/* eslint-disable camelcase */
import Joi from 'joi';
import Helpers from '../../utils/Helpers';

export const addAddressesRequestValidation = (req) => {

	const adresses = Joi.object({
		province: Joi.string(),
		district: Joi.string(),
		street: Joi.string(),
		building_number: Joi.number().integer(),
		flat: Joi.number().integer(),
		apartment_number: Joi.number().integer()
	});

	const schema = Joi.object({
		addresses: Joi.array().items(adresses)
	});

	const result = schema.validate(req.body);
	if (result.error) {
		return Helpers.setFailJson(result.error.message);
	}

	return Helpers.setSuccessJson(result.message);
};