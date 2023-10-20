const { getAllData, getSingleEntry} = require('../controllers/pop-data-controller');

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

// ROUTES
  function popDataRoutes(fastify, options, done) {
    // GET
      // ALL DATA
      fastify.get('/api/population', getAllOptions);
      
      // SINGLE POPULATION DATA ENTRY BY CITY & STATE
      fastify.get('/api/population/state/:state/city/:city', getPopulationOptions); 

    // PUT
      // UPDATE POPULATION DATA ENTRY BY CITY & STATE
      // TODO: build route  

    // POST
      // ADD NEW POPULATION DATA ENTRY
      // TODO: build route

    done()
  }

module.exports = popDataRoutes;