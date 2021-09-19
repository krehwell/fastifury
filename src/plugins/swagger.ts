import fp from "fastify-plugin";

/**
 * API DOCUMENTATION
 */
export default fp(async (fastify, _opts) => {
    fastify.register(require("fastify-swagger"), {
        routePrefix: "/swagger",
        swagger: {
            info: {
                title: "API - Note to My Future Children",
                description: "An API for WEB - Note to My Future Children",
                version: "0.1.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            host: "localhost:3000",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "user", description: "User related end-points" },
            ],
        },
        uiConfig: {
            // docExpansion: "full",
            deepLinking: false,
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true,
    });
});
