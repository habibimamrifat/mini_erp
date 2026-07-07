"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionBlueprintController = void 0;
const rolePermissinBlueprint_service_1 = require("./rolePermissinBlueprint.service");
const createRolePermissionBlueprint = async (req, res) => {
    const result = await rolePermissinBlueprint_service_1.rolePermissionBlueprintService.createRolePermissionBlueprint(req.body);
    res.status(201).json({
        success: true,
        message: "Blueprint created successfully",
        data: result,
    });
};
const getAllRolePermissionBlueprints = async (req, res) => {
    const result = await rolePermissinBlueprint_service_1.rolePermissionBlueprintService.getAllRolePermissionBlueprints(req.query);
    res.status(200).json({
        success: true,
        message: "Blueprints retrieved successfully",
        data: result,
    });
};
const updateRolePermissionBlueprint = async (req, res) => {
    const { id } = req.params;
    const result = await rolePermissinBlueprint_service_1.rolePermissionBlueprintService.updateRolePermissionBlueprint(id, req.body);
    res.status(200).json({
        success: true,
        message: "Blueprint updated successfully",
        data: result,
    });
};
const deleteRolePermissionBlueprint = async (req, res) => {
    const { id } = req.params;
    const result = await rolePermissinBlueprint_service_1.rolePermissionBlueprintService.deleteRolePermissionBlueprint(id);
    res.status(200).json({
        success: true,
        message: "Blueprint deleted successfully",
        data: result,
    });
};
const updateBlueprintPermission = async (req, res) => {
    const { id } = req.params;
    const { permissionId, action } = req.body;
    const result = await rolePermissinBlueprint_service_1.rolePermissionBlueprintService.updateBlueprintPermission(id, permissionId, action);
    res.status(200).json({
        success: true,
        message: `Permission ${action}ed successfully`,
        data: result,
    });
};
exports.RolePermissionBlueprintController = {
    createRolePermissionBlueprint,
    getAllRolePermissionBlueprints,
    updateRolePermissionBlueprint,
    deleteRolePermissionBlueprint,
    updateBlueprintPermission
};
