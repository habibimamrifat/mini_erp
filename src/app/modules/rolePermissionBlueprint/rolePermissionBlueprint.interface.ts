import { Types } from "mongoose";

export interface IRolePermissionBlueprint {
  name: string;
  roleId: Types.ObjectId;
  permissionIds: Types.ObjectId[];
}