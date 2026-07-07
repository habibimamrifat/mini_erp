"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const permission_service_1 = require("./permission.service");
const createPermission = async (req, res) => {
    const result = await permission_service_1.permissionService.createPermission(req.body);
    res.status(201).json({
        success: true,
        message: "Permission created successfully",
        data: result,
    });
};
const getAllPermissions = async (req, res) => {
    const result = await permission_service_1.permissionService.getAllPermissions({
        ...req.query,
        isDeleted: req.query.isDeleted !== undefined
            ? req.query.isDeleted === "true"
            : undefined,
    });
    res.status(200).json({
        success: true,
        message: "Permissions retrieved successfully",
        data: result,
    });
};
const getSinglePermission = async (req, res) => {
    const result = await permission_service_1.permissionService.getSinglePermission(req.params.id);
    res.status(200).json({
        success: true,
        message: "Permission retrieved successfully",
        data: result,
    });
};
const updatePermission = async (req, res) => {
    const result = await permission_service_1.permissionService.updatePermission(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Permission updated successfully",
        data: result,
    });
};
const toggleDeletePermission = async (req, res) => {
    const result = await permission_service_1.permissionService.toggleDeletePermission(req.params.id);
    res.status(200).json({
        success: true,
        message: "Permission status updated successfully",
        data: result,
    });
};
const getAllModules = async (req, res) => {
    const result = await permission_service_1.permissionService.getAllModules();
    res.status(200).json({
        success: true,
        message: "Modules retrieved successfully",
        data: result,
    });
};
exports.PermissionController = {
    createPermission,
    getAllModules,
    getAllPermissions,
    getSinglePermission,
    updatePermission,
    toggleDeletePermission,
};
