import { Schema, model } from "mongoose";
import { IRolePermissionBlueprint } from "./rolePermissionBlueprint.interface";

const rolePermissionBlueprintSchema =
  new Schema<IRolePermissionBlueprint>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      roleId: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
      permissionIds: [
        {
          type: Schema.Types.ObjectId,
          ref: "Permission",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export const RolePermissionBlueprintModel = model<IRolePermissionBlueprint>(
  "RolePermissionBlueprint",
  rolePermissionBlueprintSchema
);