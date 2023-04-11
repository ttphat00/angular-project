import { User } from "./user";

export interface Auth {
    msg: string,
    accessToken: string,
    user: User
}