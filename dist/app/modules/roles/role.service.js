"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = void 0;
const role_model_1 = require("./role.model");
const createRole = async (payload) => {
    const role = await role_model_1.RoleModel.create(payload);
    return role;
};
const getAllRoles = async (id, isDeleted) => {
    const query = {
        isDeleted: isDeleted ?? false,
    };
    if (id) {
        query._id = id;
    }
    const roles = await role_model_1.RoleModel.find(query);
    return roles;
};
const getSingleRole = async (id) => {
    const role = await role_model_1.RoleModel.findById(id);
    return role;
};
const updateRole = async (id, payload) => {
    const updatedRole = await role_model_1.RoleModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedRole;
};
const toggleDeleteRole = async (id) => {
    const role = await role_model_1.RoleModel.findById(id);
    if (!role) {
        throw new Error("Role not found");
    }
    role.isDeleted = !role.isDeleted;
    await role.save();
    return role;
};
exports.roleService = {
    createRole,
    getAllRoles,
    getSingleRole,
    updateRole,
    toggleDeleteRole,
};
