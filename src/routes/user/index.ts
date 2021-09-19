import { FastifyPluginAsync } from "fastify";
import { nanoid } from "nanoid";
import {
    TUser,
    OUser,
    OUserPublicData,
    TUserPublicData,
    TUserPublicDataOpt,
    OUserPublicDataOpt,
    ORequestParams,
    TRequestParams,
} from "./user.interface";
import { user_db } from "./user.db";
import "fastify-swagger";

/**
 * User route: /user
 */

// Most importantly, use declaration merging to add the custom property to the Fastify type system
const __user: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
    const db_user = await user_db(fastify.pg);

    fastify.route({
        method: "GET",
        url: "/",
        schema: {
            summary: "Get all users",
            tags: ["user"],
            response: {
                200: {
                    type: "array",
                    users: OUser,
                },
            },
        },
        handler: async (_req, reply) => {
            const result = await db_user.getAllUsers();
            reply.status(200).send(result);
        },
    });

    fastify.route<{ Params: TRequestParams }>({
        method: "GET",
        url: "/:id",
        schema: {
            summary: "Get user by id",
            tags: ["user"],
            params: ORequestParams,
            response: {
                200: OUser,
            },
        },
        handler: async (req, reply) => {
            let { id } = req.params;

            const result: TUser = await db_user.getUserById(id);

            console.log(id, result);

            if (result) {
                reply.status(200).send(result);
            } else {
                reply.status(404).send({ message: "user not found" });
            }
        },
    });

    fastify.route<{ Body: TUserPublicData }>({
        method: "POST",
        url: "/create",
        schema: {
            summary: "Create New User",
            description: "Takes user {name, email} as required data",
            tags: ["user"],
            body: OUserPublicData,
            response: {
                201: OUser,
            },
        },
        handler: async (req, reply) => {
            let userData: TUser = {
                id: nanoid(),
                created: Math.floor(Date.now() / 1000),
                ...req.body,
            };

            const result: TUser = await db_user.createUser(userData);

            console.log("RESULT", result);

            if (result) {
                reply.status(201).send(result);
            } else {
                reply.status(404).send({ message: "error creating user" });
            }
        },
    });

    fastify.route<{ Params: TRequestParams; Body: TUserPublicDataOpt }>({
        method: "PUT",
        url: "/update/:id",
        schema: {
            summary: "Update user public information",
            description: "Takes {name?, email?} as optional body to be updated",
            tags: ["user"],
            params: ORequestParams,
            body: OUserPublicDataOpt,
            response: {
                202: OUser,
            },
        },
        handler: async (req, reply) => {
            const user_new_data = req.body;
            const { id: userId } = req.params;

            const result = await db_user.updateUser(userId, user_new_data);

            if (result) {
                reply.status(202).send(result);
            } else {
                reply.status(404).send({ message: "user not found" });
            }
        },
    });

    fastify.route<{ Params: TRequestParams }>({
        method: "DELETE",
        url: "/delete/:id",
        schema: {
            summary: "Delete User by Id",
            tags: ["user"],
            params: ORequestParams,
            response: {
                204: { type: "object" },
            },
        },
        handler: async (req, reply) => {
            const { id } = req.params;

            const result = await db_user.deleteUser(id);

            if (result) {
                reply.status(204).send({ message: "user deleted" });
            } else {
                reply.status(404).send({ message: "user not found" });
            }
        },
    });
};

export default __user;
