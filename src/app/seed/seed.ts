import { RoleModel } from "../modules/roles/role.model";
import { roles } from "./role.seed";

import {seedRolePermissionBlueprintsAdmin } from "../modules/rolePermissionBlueprint/rolePermissionBlueprint.seed";
import { seedAdmin } from "../modules/users/user.seed";

export const seedDatabase = async () => {

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


  // Seed Permission Blueprints

  await seedRolePermissionBlueprintsAdmin();

  console.log("✅ Admin Role Permission Blueprints Seeded");


  // Seed Admin

  await seedAdmin();

  console.log("✅ Admin Seeded");

  console.log("🎉 Database Seeding Completed");
};