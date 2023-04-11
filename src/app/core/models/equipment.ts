import { Brand } from "./brand";
import { EquipmentStatus } from "./equipment-status";
// import { Location } from "./location";

export interface Equipment{
    _id: string,
    name: string,
    description: string,
    image: string,
    locationId: null | undefined,
    brandId: Brand,
    statusId: EquipmentStatus,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}