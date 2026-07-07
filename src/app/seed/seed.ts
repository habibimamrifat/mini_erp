import mongoose from "mongoose";
import dotenv from "dotenv";

import { PermissionModel } from "../modules/permissions/permissin.model";
import { RoleModel } from "../modules/roles/role.model";

import { permissions } from "./permission.seed";
import { roles } from "./role.seed";
import { seedRolePermissionBlueprints } from "../modules/rolePermissionBlueprint/rolePermissionBlueprint.seed";
import { seedAdmin } from "../modules/users/user.seed";


dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);

    console.log("MongoDB Connected");

    // Seed Permissions
    for (const permission of permissions) {
      await PermissionModel.updateOne(
        {
          code: permission.code,
        },
        permission,
        {
          upsert: true,
        },
      );
    }

    console.log("Permissions Seeded");

    // Seed Roles
    for (const role of roles) {
      await RoleModel.updateOne(
        {
          name: role.name,
        },
        role,
        {
          upsert: true,
        },
      );
    }

    console.log("Roles Seeded");
    //seed rolePermissionBlueprints
    // Seed Blueprints
    
    await seedRolePermissionBlueprints();
    //seed admin user
    await seedAdmin()

    console.log("Seeding Completed");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export const seedDatabase = seed;
