import amqp from 'amqplib';
import RabbitEnv from '../src/config/rabbitEnv';
import nodemailer from 'nodemailer';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

export default class RabbitMqMailHelper {

	static async rabbitMqMailProducer(mail) {
		try {
			const queue = RabbitEnv[env].mail_queue;
			const connection = await amqp.connect(RabbitEnv[env].host);
			const channel = await connection.createChannel();
			await channel.assertQueue(queue, {
				durable: false
			});
			channel.prefetch(1);
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(mail)));
			setTimeout(() => {
				connection.close();
			}, 500);
		}
		catch (error) {
			throw error;
		}
	}

	static async rabbitMqMailConsumer() {
		try {
			let mailURl;
			const queue = RabbitEnv[env].mail_queue;
			const connection = await amqp.connect(RabbitEnv[env].host);
			const channel = await connection.createChannel();
			await channel.assertQueue(queue, {
				durable: false
			});
			await channel.consume(queue, async (mail) => {
				const mailOptions = JSON.parse(mail.content.toString());
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
				mailURl = nodemailer.getTestMessageUrl(info);
				console.log('Preview URL: %s', mailURl);
                
				channel.ack(mail);
			});
		}
		catch (error) {
			throw error;
		}
	}

}
