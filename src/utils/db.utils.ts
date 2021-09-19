import { IDictionary } from "./interfaces.utils";

/**
 * Create an update query that ignores the null object passed, so it will update the truthy values only
 */
export function create_update_schema(userId: string, table: string, data: IDictionary) {
    if (!userId || typeof userId !== "string") {
        throw new TypeError("Please provide 'userId'");
    }

    if (!table || typeof table !== "string") {
        throw new TypeError("Parameter 'table' must be a non-empty string.");
    }

    if (!data || typeof data !== "object") {
        throw new TypeError("Parameter 'data' must be an object.");
    }

    let keys = Object.keys(data).filter(function (k: string) {
        return data[k] !== undefined;
    });

    let names = keys
        .map(function (k, index) {
            return k + " = $" + (index + 1);
        })
        .join(", ");

    let values = keys.map(function (k) {
        return data[k];
    });

    return {
        query: "UPDATE " + table + " SET " + names + ` WHERE id = $${values.length + 1}`,
        values: [...values, userId],
    };
}
