// REDIS CONNECTION //
  const client = require('../redis');

// CONTROLLERS //
  const getSingleEntry = async (req, res) => {
    let { city, state } = req.params;

    city = formatParams(city);
    state = formatParams(state);

    // the key in Redis is all lowercase city-state (e.g. 'metuchen-borough-new-jersey')
    key = `${city}` + `-` + `${state}`; 

    // returns value (population) assigned to key in Redis
    let replyPop = await client.get(key)
    if (replyPop) {
      let jsonReplyPop = {"population": replyPop}
      res.status(200).send(jsonReplyPop);
    } else {
      res.status(400).send(`Entry not found, please re-check parameters or use the POST route to create a new entry.`);
    }
  }

  const putSingleEntry = async (req, res) => {
    try {
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
        // no key found, so we add a new key-value entry to Redis
        client.set(key, population);
        res.status(201).send({ population });
      }
    } catch {
      res.status(400).send(`Entry could not be updated, please re-check the route and its parameters.`);
    }
  }

  const postSingleEntry = async (req, res) => {
    try {
      let { city, state } = req.params;
      let { population } = req.body;

      city = formatParams(city);
      state = formatParams(state);

      // the key in Redis is all lowercase city-state (e.g. 'metuchen-borough-new-jersey')
      key = `${city}` + `-` + `${state}`

      // returns value (population) assigned to key in Redis
      let replyPop = await client.get(key)

      if (replyPop) {
        res.status(409).send('Entry already exists, please use PUT to update');
      } else {
        client.set(key, population);
        res.status(201).send({ population });
      } 
    } catch {
      res.status(400).send(`Entry could not be created, please re-check the route and its parameters.`);
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
  getSingleEntry,
  putSingleEntry,
  postSingleEntry
}