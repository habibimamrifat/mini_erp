import { RoleModel } from "../modules/roles/role.model";
import { roles } from "./role.seed";
import { seedRolePermissionBlueprintsAdmin } from "../modules/rolePermissionBlueprint/rolePermissionBlueprint.seed";

export const seedRoles = async () => {
  for (const role of roles) {
    await RoleModel.updateOne(
      { name: role.name },
      {
        $set: role,
      },
      {
        upsert: true,
      }
    );
  }
  console.log("✅ Roles Seeded");
};