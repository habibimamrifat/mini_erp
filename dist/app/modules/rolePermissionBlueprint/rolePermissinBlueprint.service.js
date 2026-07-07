"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissionBlueprintService = void 0;
const permissin_model_1 = require("../permissions/permissin.model");
const relePermissionBlueprint_model_1 = require("./relePermissionBlueprint.model");
const createRolePermissionBlueprint = async (payload) => {
    const blueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.create(payload);
    return blueprint;
};
const getAllRolePermissionBlueprints = async (query) => {
    const filter = {};
    if (query.id) {
        filter._id = query.id;
    }
    if (query.name) {
        filter.name = query.name;
    }
    if (query.roleId) {
        filter.roleId = query.roleId;
    }
    const blueprints = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.find(filter)
        .populate("roleId")
        .populate("permissionIds");
    return blueprints;
};
const updateRolePermissionBlueprint = async (id, payload) => {
    const updatedBlueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("roleId")
        .populate("permissionIds");
    return updatedBlueprint;
};
const deleteRolePermissionBlueprint = async (id) => {
    const deletedBlueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findByIdAndDelete(id);
    return deletedBlueprint;
};
const updateBlueprintPermission = async (blueprintId, permissionId, action) => {
    // Check if blueprint exists
    const blueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findById(blueprintId);
    if (!blueprint) {
        throw new Error("Role Permission Blueprint not found");
    }
    // Check if permission exists
    const permission = await permissin_model_1.PermissionModel.findById(permissionId);
    if (!permission) {
        throw new Error("Permission not found");
    }
    const update = action === "add"
        ? {
            $addToSet: {
                permissionIds: permissionId,
            },
        }
        : {
            $pull: {
                permissionIds: permissionId,
            },
        };
    const updatedBlueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findByIdAndUpdate(blueprintId, update, {
        new: true,
        runValidators: true,
    })
        .populate("roleId")
        .populate("permissionIds");
    return updatedBlueprint;
};
exports.rolePermissionBlueprintService = {
    createRolePermissionBlueprint,
    getAllRolePermissionBlueprints,
    updateRolePermissionBlueprint,
    deleteRolePermissionBlueprint,
    updateBlueprintPermission
};
