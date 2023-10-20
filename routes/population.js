const { getAllData, getSingleEntry, putSingleEntry, postSingleEntry} = require('../controllers/pop-data-controller');

// SCHEMA
  // single data object, returns all properties
  const objectSchemaAll = {
    type: 'object',
    properties: {
      city: { type: 'string' },
      state: { type: 'string' },
      population: { type: 'number' }
    }
  }

  // single data object, returns only the population property
  const objectSchemaPop = {
    type: 'object',
    properties: {
      population: { type: 'number' }
    }
  }

// OPTIONS
  // options for GET all data
  const getAllOptions = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: objectSchemaAll
        }
      }
    },
    handler: getAllData
  }

  // options for GET single Population Data Entry from City & State req
  const getPopulationOptions = {
    schema: {
      response: {
        200: objectSchemaPop,
      },
    },
    handler: getSingleEntry
  }

  // options for PUT single Population Data Entry given City & State
  const putPopulationOptions = {
    schema: {
      response: {
        200: objectSchemaPop,
      },
    },
    handler: putSingleEntry
  }

  // options for POST single Population Data Entry given City & State
  const postPopulationOptions = {
    schema: {
      body: {
        type: 'object',
        required: ['population'],
        properties: {
          population: { type: 'number' }
        }
      },
      response: {
        201: objectSchemaPop, // 201 = entry created
      },
    },
    handler: postSingleEntry
  }



// ROUTES
  function popDataRoutes(fastify, options, done) {
    // GET ALL DATA
    fastify.get('/api/population', getAllOptions);
    
    // GET SINGLE POPULATION DATA ENTRY BY CITY & STATE
    fastify.get('/api/population/state/:state/city/:city', getPopulationOptions); 

    // PUT (UPDATE) POPULATION DATA ENTRY BY CITY & STATE
    fastify.put('/api/population/state/:state/city/:city', putPopulationOptions); 

    // POST (ADD) NEW DATA ENTRY (BODY: "population": num/uint)
    fastify.post('/api/population/state/:state/city/:city', postPopulationOptions);

    done()
  }

module.exports = popDataRoutes;