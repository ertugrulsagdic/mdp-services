import redis from 'redis';
import asyncRedis from 'async-redis';

const client = redis.createClient({
	host: 'redis-server',
	port: 6379
});

const asyncClient = asyncRedis.decorate(client);

module.exports = asyncClient;