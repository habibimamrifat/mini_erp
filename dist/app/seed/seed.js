"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const permissin_model_1 = require("../modules/permissions/permissin.model");
const role_model_1 = require("../modules/roles/role.model");
const permission_seed_1 = require("./permission.seed");
const role_seed_1 = require("./role.seed");
const rolePermissionBlueprint_seed_1 = require("../modules/rolePermissionBlueprint/rolePermissionBlueprint.seed");
const user_seed_1 = require("../modules/users/user.seed");
dotenv_1.default.config();
async function seed() {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected");
        // Seed Permissions
        for (const permission of permission_seed_1.permissions) {
            await permissin_model_1.PermissionModel.updateOne({
                code: permission.code,
            }, permission, {
                upsert: true,
            });
        }
        console.log("Permissions Seeded");
        // Seed Roles
        for (const role of role_seed_1.roles) {
            await role_model_1.RoleModel.updateOne({
                name: role.name,
            }, role, {
                upsert: true,
            });
        }
        console.log("Roles Seeded");
        //seed rolePermissionBlueprints
        // Seed Blueprints
        await (0, rolePermissionBlueprint_seed_1.seedRolePermissionBlueprints)();
        //seed admin user
        await (0, user_seed_1.seedAdmin)();
        console.log("Seeding Completed");
        process.exit(0);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
seed();
