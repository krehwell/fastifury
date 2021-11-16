import fp from "fastify-plugin";
import fastifyEnv from "fastify-env";

const schema = {
    type: "object",
    required: ["DB_URI"],
    properties: {
        DB_URI: {
            type: "string",
        },
    },
};

const options = {
    // confKey: "config", // optional, default: 'config'
    schema: schema,
};

/**
 * .env CONFIG
 */
export default fp(async (fastify, _opts) => {
    fastify.register(fastifyEnv, options);
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
    export interface FastifyInstance {
        config: {
            DB_URI: string;
        };
    }
}
