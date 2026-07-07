"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRolePermissionBlueprints = void 0;
const permissin_model_1 = require("../permissions/permissin.model");
const role_model_1 = require("../roles/role.model");
const relePermissionBlueprint_model_1 = require("./relePermissionBlueprint.model");
const seedRolePermissionBlueprints = async () => {
    // Fetch seeded roles and permissions
    const roles = await role_model_1.RoleModel.find();
    const permissions = await permissin_model_1.PermissionModel.find();
    // Create Role Map
    const roleMap = new Map(roles.map((role) => [role.name, role._id]));
    console.log("Role Map:", roleMap);
    // Create Permission Map
    const permissionMap = new Map(permissions.map((permission) => [permission.code, permission._id]));
    console.log("Permission Map:", permissionMap);
    // ==========================
    // Admin Blueprint
    // ==========================
    const adminDefaultPermissions = permissions.map((permission) => permission._id);
    console.log("Admin Default Permissions:", adminDefaultPermissions);
    await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.updateOne({
        name: "Admin Blueprint",
    }, {
        name: "Admin Blueprint",
        roleId: roleMap.get("Admin"),
        permissionIds: adminDefaultPermissions
    }, {
        upsert: true,
    });
    // ==========================
    // Manager Blueprint
    // ==========================
    const managerPermissions = [
        "dashboard:view",
        "product:create",
        "product:read",
        "product:update",
        "product:delete",
        "customer:create",
        "customer:read",
        "customer:update",
        "customer:delete",
        "sales:create",
        "sales:read",
    ];
    const managerDefaultPermissions = managerPermissions.map((code) => permissionMap.get(code));
    console.log("Manager Default Permissions:", managerDefaultPermissions);
    await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.updateOne({
        name: "Manager Blueprint",
    }, {
        name: "Manager Blueprint",
        roleId: roleMap.get("Manager"),
        permissionIds: managerDefaultPermissions,
    }, {
        upsert: true,
    });
    // ==========================
    // Employee Blueprint
    // ==========================
    const employeePermissions = [
        "customer:create",
        "customer:read",
        "customer:update",
        "customer:delete",
        "product:read",
        "sales:create",
    ];
    const employeeDefaultPermissions = employeePermissions.map((code) => permissionMap.get(code));
    console.log("Employee Default Permissions:", employeeDefaultPermissions);
    await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.updateOne({
        name: "Employee Blueprint",
    }, {
        name: "Employee Blueprint",
        roleId: roleMap.get("Employee"),
        permissionIds: employeeDefaultPermissions,
    }, {
        upsert: true,
    });
    console.log("✅ Role Permission Blueprints Seeded");
};
exports.seedRolePermissionBlueprints = seedRolePermissionBlueprints;
