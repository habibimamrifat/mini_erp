import { PermissionModel } from "../modules/permissions/permissin.model";
import { RoleModel } from "../modules/roles/role.model";

import { permissions } from "./permission.seed";
import { roles } from "./role.seed";

import { seedRolePermissionBlueprints } from "../modules/rolePermissionBlueprint/rolePermissionBlueprint.seed";
import { seedAdmin } from "../modules/users/user.seed";

export const seedDatabase = async () => {
  console.log("🌱 Starting database seed...");

  // =========================
  // Seed Permissions
  // =========================
  for (const permission of permissions) {
    await PermissionModel.updateOne(
      { code: permission.code },
      permission,
      { upsert: true }
    );
  }

  console.log("✅ Permissions Seeded");

  // =========================
  // Seed Roles
  // =========================
  for (const role of roles) {
    await RoleModel.updateOne(
      { name: role.name },
      role,
      { upsert: true }
    );
  }

  console.log("✅ Roles Seeded");

  // =========================
  // Seed Permission Blueprints
  // =========================
  await seedRolePermissionBlueprints();

  console.log("✅ Permission Blueprints Seeded");

  // =========================
  // Seed Admin
  // =========================
  await seedAdmin();

  console.log("✅ Admin Seeded");

  console.log("🎉 Database Seeding Completed");
};