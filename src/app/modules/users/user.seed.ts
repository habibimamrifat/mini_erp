import bcrypt from "bcrypt";
import config from "../../config";
import { UserModel } from "./user.model";
import { RoleModel } from "../roles/role.model";
import { RolePermissionBlueprintModel } from "../rolePermissionBlueprint/relePermissionBlueprint.model";

export const seedAdmin = async () => {
  const existingAdmin = await UserModel.findOne({
    email: config.admin_email,
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  const adminRole = await RoleModel.findOne({
    name: "Admin",
    isDeleted: false,
  });

  if (!adminRole) {
    throw new Error("Admin role not found.");
  }

  const blueprint = await RolePermissionBlueprintModel.findOne({
    roleId: adminRole._id,
  });

  if (!blueprint) {
    throw new Error("Admin permission blueprint not found.");
  }

  const hashedPassword = await bcrypt.hash(
    config.admin_password!,
    10
  );

  const admin = await UserModel.create({
    name: "Super Admin",
    email: config.admin_email,
    phone: config.admin_phone,
    password: hashedPassword,
    roleId: adminRole._id,
    permissionBlueprintId: blueprint._id,
    blockedPermissionIds: [],
    img: "",
    isDeleted: false,
  });

  return UserModel.findById(admin._id)
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");
};