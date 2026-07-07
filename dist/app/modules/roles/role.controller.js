"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const role_service_1 = require("./role.service");
const createRole = async (req, res) => {
    const result = await role_service_1.roleService.createRole(req.body);
    res.status(201).json({
        success: true,
        message: "Role created successfully",
        data: result,
    });
};
const getAllRoles = async (req, res) => {
    const isDeleted = req.query.isDeleted !== undefined
        ? req.query.isDeleted === "true"
        : undefined;
    const result = await role_service_1.roleService.getAllRoles(undefined, isDeleted);
    res.status(200).json({
        success: true,
        message: "Roles retrieved successfully",
        data: result,
    });
};
const getSingleRole = async (req, res) => {
    const id = req.params.id;
    const result = await role_service_1.roleService.getSingleRole(id);
    res.status(200).json({
        success: true,
        message: "Role retrieved successfully",
        data: result,
    });
};
const updateRole = async (req, res) => {
    const id = req.params.id;
    const result = await role_service_1.roleService.updateRole(id, req.body);
    res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: result,
    });
};
const toggleDeleteRole = async (req, res) => {
    const id = req.params.id;
    const result = await role_service_1.roleService.toggleDeleteRole(id);
    res.status(200).json({
        success: true,
        message: "Role toggled successfully",
        data: result,
    });
};
exports.RoleController = {
    createRole,
    getAllRoles,
    getSingleRole,
    updateRole,
    toggleDeleteRole,
};
