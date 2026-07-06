import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
      select: false,
    },

    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    permissionBlueprintId: {
      type: Schema.Types.ObjectId,
      ref: "RolePermissionBlueprint",
      default: null,
      required: false,
    },

    blockedPermissionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    img: {
      type: String,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);