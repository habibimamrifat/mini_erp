import { PermissionModel } from "../permissions/permissin.model";
import { RoleModel } from "../roles/role.model";
import { RolePermissionBlueprintModel } from "./relePermissionBlueprint.model";
import { Types } from "mongoose";

export const seedRolePermissionBlueprintsAdmin = async () => {
  // Fetch seeded roles and permissions
  const roles = await RoleModel.find();
  const permissions = await PermissionModel.find();

  // Create Role Map
  const roleMap = new Map(roles.map((role) => [role.name, role._id]));
  console.log("Role Map:", roleMap);

  // Create Permission Map
  const permissionMap = new Map(
    permissions.map((permission) => [permission.code, permission._id]),
  );
  console.log("Permission Map:", permissionMap);

  // ==========================
  // Admin Blueprint
  // ==========================

  const adminDefaultPermissions = permissions.map(
    (permission) => permission._id,
  );
  console.log("Admin Default Permissions:", adminDefaultPermissions);

  await RolePermissionBlueprintModel.updateOne(
    {
      name: "Admin Blueprint",
    },
    {
      name: "Admin Blueprint",
      roleId: roleMap.get("Admin"),
      permissionIds: adminDefaultPermissions,
    },
    {
      upsert: true,
    },
  );

  console.log("✅ Admin Role Permission Blueprints Seeded");
};
