/* eslint-disable camelcase */
import PrivateController from '../controller/PrivateController';
import express from 'express';
import jwt from 'jsonwebtoken';
import { login_secret } from '../../src/config/settings';
import Util from '../../utils/utils';

const utils = new Util();

const app = express();

app.use(async function(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		utils.setError(403, 'No token provided!');
		return utils.send(res);
	}

	jwt.verify(token, login_secret, (err, decoded) => {
		console.log(decoded);
		if (err) {
			utils.setError(401, err.message);
			return utils.send(res);
		}
		req.user_id = decoded.id;
		next();
	});
});

app.get('/Address', PrivateController.getAddresses);
app.post('/Add/Addresses/At/Once', PrivateController.addAddressesAtOnce);
app.post('/Add/Addresses/RabbitMQ', PrivateController.addAddressesRabbitMQ);

module.exports = app;