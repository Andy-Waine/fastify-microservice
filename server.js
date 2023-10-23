
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

// Define function to handle data upload to Redis
const uploadData = async () => {
  console.log('Uploading data to Redis...')
  
  // Loop through popData array
  for(const data of popData) {
    // replace any spaces in the city and state with a dash
    data.city = data.city.replace(/\s/g, '-');
    data.state = data.state.replace(/\s/g, '-');

    // make all characters in the city and state lowercase
    data.city = data.city.toLowerCase();
    data.state = data.state.toLowerCase();

    let key = `${data.city}` + `-` + `${data.state}`;
    console.log(key)
    client.set(key, JSON.stringify(data.population));
  }
  console.log('Data uploaded to Redis successfully.');

  // SIMPLETEST: get population of Orlando, FLorida
  const testPop = await client.get('orlando-florida')
  console.log("Orlando, Florida population:", testPop)
}

const setRedisData = async () => {
   // keyExists <bool>: true if Redis already has popData key, false if not
  const keyExists = await client.exists('metuchen-borough-new-jersey');
  if (!keyExists) {
    // popData does not exist in Redis, so popData key in Redis is set to local pop-data.js
    uploadData()
  } else {
    // popData already exists in Redis. Function exits, allowing data to persist
    console.log('popData already exists in Redis');
  }
}

start() 