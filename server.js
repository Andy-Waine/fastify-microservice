
const client = require('./redis');
const fastify = require('fastify')({logger: true});
const popData = require('./pop-data');
fastify.register(require('./routes/population'));

const PORT = 5555;

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    await connectRedis();
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

const connectRedis = async () => {
  await client.connect();
  console.log('Redis client connected');

  setRedisData();
}

const setRedisData = async () => {
  const keyExists = await client.exists('popData'); // bool: true if Redis already has popData
  if (!keyExists) {
    // popData does not exist in Redis, so popData key in Redis is set to local pop-data.js
    await client.set('popData', JSON.stringify(popData));
    console.log('popData saved to Redis');
  } else {
    // popData already exists in Redis. Function exits, allowing data to persist
    console.log('popData already exists in Redis');
  }
}

start()