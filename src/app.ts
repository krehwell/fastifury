import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";

export type AppOptions = {
    // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
    fastify.register(AutoLoad, {
        dir: join(__dirname, "plugins"),
        options: opts,
    });

    fastify.register(AutoLoad, {
        dir: join(__dirname, "routes"),
        options: opts,
    });
};

export default app;
export { app };
