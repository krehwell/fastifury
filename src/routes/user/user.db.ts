import { PostgresDb } from "fastify-postgres";
import { create_update_schema } from "../../utils/db.utils";
import { TUser, OUser, TUserPublicDataOpt } from "./user.interface";

/////
/// DATA ACCESS LAYER - USER
///

export const user_db = async (db: PostgresDb) => {
    const client = await db.connect();

    const getAllUsers = async (): Promise<TUser[]> => {
        const users = await client.query("SELECT id, name, email, created FROM usertable");

        return users.rows as TUser[];
    };

    const getUserById = async (id: string): Promise<TUser> => {
        const user = await client.query("SELECT * FROM usertable WHERE id=($1)", [id]);
        return user.rows[0] as TUser;
    };

    const createUser = async (new_user: TUser): Promise<TUser> => {
        const { id, name, email, created } = new_user;
        const result = await client.query(
            "INSERT INTO USERTABLE (id, name, email, created) VALUES ($1, $2, $3, $4) RETURNING *",
            [id, name, email, created]
        );

        return result.rows[0] as TUser;
    };

    const updateUser = async (userId: string, user_new_data: TUserPublicDataOpt): Promise<TUser> => {
        const { name, email } = user_new_data;
        const { query, values } = create_update_schema(userId, "usertable", { name, email });

        const result = await client.query(query + " RETURNING *", values);

        return result.rows[0] as TUser;
    };

    const deleteUser = async (userId: string) => {
        const result = await client.query("DELETE FROM usertable WHERE id = $1 RETURNING *", [userId]);

        return result.rows[0];
    };

    return { getUserById, getAllUsers, createUser, updateUser, deleteUser };
};
