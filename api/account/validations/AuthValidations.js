/* eslint-disable camelcase */
import Joi from 'joi';
import Helpers from '../../utils/helpers';

export const signupUserRequestValidation = (req) => {

	const phone_numbers = Joi.object({
		phone_number: Joi.string().length(10).pattern(/^[0-9]+$/)
	});

	const adresses = Joi.object({
		province: Joi.string(),
		district: Joi.string(),
		street: Joi.string(),
		building_number: Joi.number().integer(),
		flat: Joi.number().integer(),
		apartment_number: Joi.number().integer()
	});

	const schema = Joi.object({
		first_name: Joi.string(),
		last_name: Joi.string(),
		username: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(14).required(),
		phone_numbers: Joi.array().items(phone_numbers),
		addresses: Joi.array().items(adresses)
	});

	const result = schema.validate(req.body);
	if (result.error) {
		return Helpers.setFailJson(result.error.message);
	}

	return Helpers.setSuccessJson(result.message);
};

export const loginUserRequestValidation = (req) => {
    
	const schema = Joi.object({
		email: Joi.string().email(),
		username: Joi.string(),
		password: Joi.string().min(8).max(14).required()
	});

	const result = schema.validate(req.body);

	if (result.error) {
		return Helpers.setFailJson(result.error.message);
	}

	return Helpers.setSuccessJson(result.message);
};