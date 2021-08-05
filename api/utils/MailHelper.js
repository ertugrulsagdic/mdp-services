/* eslint-disable max-len */
import nodemailer from 'nodemailer';

export default class MailHelper {

	static async sendMail(mailOptions) {

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
            
			const info = await transporter.sendMail(mailOptions);

			console.log('Message sent: %s', info.messageId);
			const mailURl = nodemailer.getTestMessageUrl(info);
			console.log('Preview URL: %s', mailURl);
			return mailURl;

		}
		catch (error) {
			throw error;
		}

	}

}