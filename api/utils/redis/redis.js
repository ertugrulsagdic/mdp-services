import redis from 'redis';
import asyncRedis from 'async-redis';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

let host;

env === 'docker' ? host = 'redis-server' : host = 'localhost';

const client = redis.createClient({
	host: host,
	port: 6379
});

const asyncClient = asyncRedis.decorate(client);

module.exports = asyncClient;