// import { Location } from "./location";
import { Role } from "./role";

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    phone: string,
    avatar: string,
    gender: string,
    locationId: null | undefined,
    roleId: Role,
    isDeleted: boolean,
    createdAt: Date,
}
