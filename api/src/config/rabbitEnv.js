module.exports = {
    'development': {
		host: 'amqp://localhost',
		mail_queue: 'dev_mail',
		address_queue: 'dev_address',
		application_queue: 'dev_applications',
		licence_queue: 'dev_licences'
	},   
	 'docker': {
		host: 'amqp://rabbitmq',
		mail_queue: 'docker_mail',
		address_queue: 'docker_address',
		application_queue: 'docker_applications',
		licence_queue: 'docker_licences'
	},
}