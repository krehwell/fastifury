import fp from "fastify-plugin";
import fastifyPostgres, { PostgresPluginOptions } from "fastify-postgres";

/**
 * DB CONNECTION
 */
export default fp<PostgresPluginOptions>(async (fastify, _opts) => {
    fastify.register(fastifyPostgres, {
        connectionString: "postgres://ubcuvgty:OY5h-jK4DeRO6zmi0lhWb0G73IdfuvPE@satao.db.elephantsql.com/ubcuvgty",
    });
});
