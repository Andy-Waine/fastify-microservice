const fastify = require('fastify')({logger: true});
fastify.register(require('./routes/population'));
const PORT = 5555;

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
  } catch(err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()