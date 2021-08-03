/* eslint-disable max-len */
import nodemailer from 'nodemailer';

export default class MailHelper {

	static async sendForgotPasswordMail(req, email, token) {

		try {
			let testAccount = await nodemailer.createTestAccount();

			let transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, 
				auth: {
					user: testAccount.user, // generated ethereal user
					pass: testAccount.pass // generated ethereal password
				}
			});
            
			const info = await transporter.sendMail({
				from: '"MDP Services" <ertugrul@mdpgroup.com>', 
				to: email,
				subject: 'MDP Services Forgot Password Mail',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/account/v1/Password/Reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			});

			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		}
		catch (error) {
			throw error;
		}

	}

}