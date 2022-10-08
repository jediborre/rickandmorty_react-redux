const {createClient} = require('redis');
const env = require('dotenv').config().parsed;

const client = createClient({
    url: `redis://${env.REDIS_USER}:${env.REDIS_PASSWORD}@${env.REDIS_HOST}:${env.REDIS_PORT}`
});

client.on('error', err => console.error('Redis Client Error', err));

module.exports = client;