const redis = require('redis');
const REDIS_PORT = 6379; // default Redis port

const client = redis.createClient({
  host: '127.0.0.1',
  port: REDIS_PORT
})

module.exports = client;