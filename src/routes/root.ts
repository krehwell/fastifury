import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/", async function (_request, _reply) {
        return { message: "API is working, kel!" };
    });
};

export default root;
