// REDIS CONNECTION //
  const client = require('../redis');

// CONTROLLERS //
  const getAllData = (req, res) => {
    res.send(data)
  }

  const getSingleEntry = async (req, res) => {
    let { city, state } = req.params;

    city = formatParams(city);
    state = formatParams(state);

    // the key in Redis is all lowercase city-state (e.g. 'metuchen-borough-new-jersey')
    key = `${city}` + `-` + `${state}`; 

    // returns value (population) assigned to key in Redis
    let replyPop = await client.get(key)
    res.send(replyPop);
  }

  const putSingleEntry = async (req, res) => {
    let { city, state } = req.params;
    let { population } = req.body;

    city = formatParams(city);
    state = formatParams(state);

    // the key in Redis is all lowercase city-state (e.g. 'metuchen-borough-new-jersey')
    key = `${city}` + `-` + `${state}`

    // returns value (population) assigned to key in Redis
    let replyPop = await client.get(key)

    if (replyPop) {
      // update the value (population) assigned to the key in Redis
      client.set(key, population);
      res.send({ population });
    } else {
      res.status(404).send('Entry not found');
      // TODO: Update this to instead call postSingleEntry
    }
  }

  const postSingleEntry = (req, res) => {
    const { city, state } = req.params;
    const { population } = req.body;
    const item = data.find(item => item.city === city && item.state === state);
    if (item) {
      res.status(409).send('Entry already exists, please use PUT to update');
    } else {
      data.push({ city, state, population });
      res.status(201).send({ population });
    }
  }


// HELPER FUNCTIONS //
  /* 
    input: string (city or state)
    output: the same string in all lowercase letters w/ spaces replaced with dashes
  */  
  const formatParams = (param) => {
    // replace any spaces in the param and state with a dash
    param = param.replace(/\s/g, '-');

    // make all characters in the param and state lowercase
    param = param.toLowerCase();

    return param;
  }

module.exports = {
  getAllData,
  getSingleEntry,
  putSingleEntry,
  postSingleEntry
}