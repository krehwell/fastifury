import fp from "fastify-plugin";
import fastifyPostgres, { PostgresPluginOptions } from "fastify-postgres";

/**
 * DB CONNECTION
 */
export default fp<PostgresPluginOptions>(async (fastify, _opts) => {
    fastify.register(fastifyPostgres, {
        connectionString: fastify.config.DB_URI,
    });
});
