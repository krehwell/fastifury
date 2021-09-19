import fp from "fastify-plugin";
import sensible, { SensibleOptions } from "fastify-sensible";

/**
 * UTILITIES TO HANDLE HTTP ERRORS
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SensibleOptions>(async (fastify, opts) => {
    fastify.register(sensible, {
        errorHandler: false,
    });
});
