import { Equipment } from "./equipment";
import { RequestStatus } from "./request-status";
import { RequestType } from "./request-type";
import { User } from "./user";

export interface BorrowingEquipment{
    _id: string,
    userId: User,
    equipmentId: Equipment,
    fromTime: Date,
    toTime: Date,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}