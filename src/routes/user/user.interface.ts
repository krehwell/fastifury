import { Type, Static } from "@sinclair/typebox";

export const OUser = Type.Object(
    {
        id: Type.String(),
        name: Type.String(),
        email: Type.String({ format: "email" }),
        created: Type.Number(),
    },
    { $id: "user" }
);
export const OUsers = Type.Array(OUser);
export type TUser = Static<typeof OUser>;

export const ORequestParams = Type.Object({
    id: Type.String()
})
export type TRequestParams = Static<typeof ORequestParams>;

export const OUserPublicData = Type.Object({
    name: Type.String(),
    email: Type.String({ format: "email" }),
});
export type TUserPublicData = Static<typeof OUserPublicData>;

export const OUserPublicDataOpt = Type.Partial(OUserPublicData);
export type TUserPublicDataOpt = Static<typeof OUserPublicDataOpt>;

