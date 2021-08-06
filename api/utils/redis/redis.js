import redis from 'redis';
import asyncRedis from 'async-redis';

const client = redis.createClient();

const asyncClient = asyncRedis.decorate(client);

module.exports = asyncClient;