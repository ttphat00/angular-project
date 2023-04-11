import { EquipmentType } from "./equipment-type";

export interface Brand{
    _id: string,
    name: string,
    deviceTypeId: EquipmentType,
    isDeleted: boolean,
}