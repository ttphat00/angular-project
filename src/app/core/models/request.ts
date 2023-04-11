import { Equipment } from "./equipment";
import { RequestStatus } from "./request-status";
import { RequestType } from "./request-type";
import { User } from "./user";

export interface Request{
    _id: string,
    message: string | null,
    requestTypeId: RequestType,
    statusId: RequestStatus,
    createdBy: User,
    equipmentId: Equipment,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}