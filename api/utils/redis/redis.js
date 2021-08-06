import redis from 'redis';

const client = redis.createClient();

module.exports = client;