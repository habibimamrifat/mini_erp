import { PermissionModel } from "../permissions/permissin.model";
import { RoleModel } from "../roles/role.model";
import { RolePermissionBlueprintModel } from "./relePermissionBlueprint.model";

export const seedRolePermissionBlueprintsAdmin = async () => {
  const adminRole = await RoleModel.findOne({
    name: "Admin",
    isDeleted: false,
  });

  if (!adminRole) {
    throw new Error("Admin role not found.");
  }

  // Fetch all active permissions
  const permissions = await PermissionModel.find({
    isDeleted: false,
  }).select("_id");

  const permissionIds = permissions.map((permission) => permission._id);

  await RolePermissionBlueprintModel.updateOne(
    {
      roleId: adminRole._id,
    },
    {
      $set: {
        name: "Admin Blueprint",
        roleId: adminRole._id,
        permissionIds,
      },
    },
    {
      upsert: true,
    }
  );

  console.log(
    `✅ Admin Blueprint synced with ${permissionIds.length} permissions`
  );
};