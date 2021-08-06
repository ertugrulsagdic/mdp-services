import express from 'express';
import cors from 'cors';
import { swaggerOptions } from './src/config/settings';
import expressSwaggerGenerator from 'express-swagger-generator';
import accountRoute from './account';
import privateRoute from './private';
import client from './utils/redis/redis';

const app = express();
const expressSwagger = expressSwaggerGenerator(app);
const port = process.env.PORT || 8000;

client.on('connect', () => {
	console.log('connected to Redis');
});
  
client.on('error', error => {
	console.error(error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/health', async (req, res) => {
	res.json({
		message: 'Server is healthy!'
	});
});

app.use('/account', accountRoute);
app.use('/private', privateRoute);

expressSwagger(swaggerOptions);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
export default app;