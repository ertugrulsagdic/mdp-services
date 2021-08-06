import amqp from 'amqplib';
import RabbitEnv from '../../src/config/rabbitEnv';
import db from '../../src/models';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

export default class AddAddressHelper {
    
	static async addAddressProducer(address) {
		try {
			const queue = RabbitEnv[env].address_queue;
			const connection = await amqp.connect(RabbitEnv[env].host);
			const channel = await connection.createChannel();
			await channel.assertQueue(queue, {
				durable: false
			});
			channel.prefetch(1);
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(address)));
			setTimeout(() => {
				connection.close();
			}, 500);
		}
		catch (error) {
			throw error;
		}
	}

	static async addAddressConsumer() {
		try {
			const queue = RabbitEnv[env].address_queue;
			const connection = await amqp.connect(RabbitEnv[env].host);
			const channel = await connection.createChannel();
			await channel.assertQueue(queue, {
				durable: false
			});
			await channel.consume(queue, async (address) => {
				const userAddress = JSON.parse(address.content.toString());
				await db.Address.create(
					userAddress
				);
				channel.ack(address);
			});
		}
		catch (error) {
			throw error;
		}
	}

}