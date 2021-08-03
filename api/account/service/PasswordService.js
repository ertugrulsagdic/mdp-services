/* eslint-disable camelcase */
/* eslint-disable max-len */
import db from '../../src/models';
import jwt from 'jsonwebtoken';
import Helpers from '../../utils/helpers';
import MailHelper from '../../utils/MailHelper';
import { forgot_password_secret } from '../../src/config/settings';
import bcrypt from 'bcrypt';

class PasswordService {

	static async forgotPassword(req) {
		try {

			const userCheck = await db.User.findOne({
				where: {
					email: req.body.email
				}
			});

			if (!userCheck)	{
				return Helpers.setFailJson('User does not found with this username!');
			}
			// Create JWT token for user with user id
			let token = jwt.sign({ id: userCheck.id }, forgot_password_secret, {
				expiresIn: 3600 // 1 hour
			});

			await MailHelper.sendForgotPasswordMail(req, userCheck.email, token);
			
			return Helpers.setSuccessJson('Mail has been sent to ' + userCheck.email + '. Please check your email to reset your password!');
		}
		catch (error) {
			throw error;
		}
	}

	static async resetPassword(req) {
		try {
			const { token } = req.params;

			if (!token) {
				return Helpers.setFailJson('Please provide token in order to change password!');
			}

		 	const user_id = await jwt.verify(token, forgot_password_secret, (error, decoded) => {
				if (error) {
					throw error;
				}
				return decoded.id;
			});
			
			const saltRounds = 10;
			const userSalt = await bcrypt.genSalt(saltRounds);
			const passwordHash = await bcrypt.hash(req.body.password, userSalt);

			await db.User.update( { password: passwordHash, salt: userSalt }, {
				where: {
					id: user_id
				}
			});

			return Helpers.setSuccessJson('The password has changed successfully.');
		}
		catch (error) {
			throw error;
		}
	}

}

export default PasswordService;