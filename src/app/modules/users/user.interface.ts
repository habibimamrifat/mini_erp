import { Types } from "mongoose";

export interface IUser {
  img?: string;
  name: string;
  email?: string;
  phoneNumber: string;
  password?: string;
  roleId: Types.ObjectId;
  rolePermissionBlueprintId: Types.ObjectId;
  blockedPermissionIds: Types.ObjectId[];
}
