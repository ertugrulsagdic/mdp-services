/* eslint-disable camelcase */
import Joi from 'joi';
import Helpers from '../../utils/Helpers';

export const forgotPasswordRequestValidation = (req) => {

	const schema = Joi.object({
		email: Joi.string().email().required()
	});

	const result = schema.validate(req.body);

	if (result.error) {
		return Helpers.setFailJson(result.error.message);
	}

	return Helpers.setSuccessJson(result.message);
};

export const resetPasswordRequestValidation = (req) => {
    
	const schema = Joi.object({
		password: Joi.string().min(8).max(14).required()
	});

	const result = schema.validate(req.body);

	if (result.error) {
		return Helpers.setFailJson(result.error.message);
	}

	return Helpers.setSuccessJson(result.message);
};