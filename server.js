
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

// Uploads local pop-data.js to Redis (when no persistent data is found in Redis)
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
    client.set(key, JSON.stringify(data.population));
  }
  console.log('Data uploaded to Redis successfully.');
}

const setRedisData = async () => {
  // an array of keys to run a datacheck in Redis (cities of various pop size, geographic location, and alphabetical order)
  var keySet = ['huntsville-alabama', 'otter-creek-florida', 'metuchen-borough-new-jersey', 'new-york-new-york', 'milwaukee-wisconsin', 'lost-springs-wyoming'];
  var keyExists = false; // default
  
  // attempt to get the value assigned to each key from our keySet in Redis
  for (let key of keySet) {
    let reply = await client.get(key)
    if (reply) {
      console.log('Redis datacheck key found! Key: ' + key);
      keyExists = true;
      break;
    } else {
      console.log('Redis datacheck key not found for: ' + key);
    }
  }

  if (!keyExists) {
    // None of our keys were found in Redis, we assume their values have not been uploaded yet, so we call uploadData()
    console.log('No Keys found in Redis')
    uploadData()
  } else {
    // At least one of our keys was found in Redis,  so we do nothing (finalizing the start() process)
    console.log('Existing Session w/ Population Data Found in Redis');
  }
}

start() 