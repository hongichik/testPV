import { types } from "mobx-state-tree";

const InfoUser = types.model({
    id: types.number,
    name: types.string,
    email: types.string,
    role_name: types.string,
    role_slug: types.string
});
export default InfoUser;

export interface User {
    id: number,
    name: string,
    email: string| null,
    role_name: string,
    role_slug: string
};

export type Users  = {
    User: User,
}