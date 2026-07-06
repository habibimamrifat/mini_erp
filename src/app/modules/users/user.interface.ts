import { Types } from "mongoose";
export interface IUser {
  name: string;
  email: string;
  phone: string;

  password?: string;

  roleId: Types.ObjectId;
  permissionBlueprintId?: Types.ObjectId;
  blockedPermissionIds: Types.ObjectId[];

  img?: string;

  isDeleted: boolean;
}