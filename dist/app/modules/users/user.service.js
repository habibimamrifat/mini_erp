"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("./user.model");
const role_model_1 = require("../roles/role.model");
const relePermissionBlueprint_model_1 = require("../rolePermissionBlueprint/relePermissionBlueprint.model");
const permissin_model_1 = require("../permissions/permissin.model");
const mongoose_1 = require("mongoose");
const createUser = async (payload) => {
    // Validate required fields
    if (!payload.roleId) {
        throw new Error("Role is required");
    }
    if (!payload.password) {
        throw new Error("Password is required");
    }
    // Check role
    const role = await role_model_1.RoleModel.findById(payload.roleId);
    if (!role) {
        throw new Error("Role not found");
    }
    // Find blueprint for this role
    const blueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findOne({
        roleId: role._id,
    });
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 10);
    // Build create payload
    const userPayload = {
        ...payload,
        password: hashedPassword,
        blockedPermissionIds: [],
    };
    // Only set blueprint if one exists
    if (blueprint) {
        userPayload.permissionBlueprintId = blueprint._id;
    }
    const user = await user_model_1.UserModel.create(userPayload);
    return await user_model_1.UserModel.findById(user._id)
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
};
const createCustomer = async (payload) => {
    const role = await role_model_1.RoleModel.findOne({
        name: "Customer",
        isDeleted: false,
    });
    if (!role) {
        throw new Error("Customer role not found");
    }
    const user = await user_model_1.UserModel.create({
        ...payload,
        password: "",
        roleId: role._id,
        blockedPermissionIds: [],
    });
    return await user_model_1.UserModel.findById(user._id)
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
};
const updateUser = async (id, payload) => {
    // Check user exists
    const existingUser = await user_model_1.UserModel.findById(id);
    if (!existingUser) {
        throw new Error("User not found");
    }
    // If role changes
    if (payload.roleId) {
        const role = await role_model_1.RoleModel.findById(payload.roleId);
        if (!role) {
            throw new Error("Role not found");
        }
        const blueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findOne({
            roleId: role._id,
        });
        // Only assign if blueprint exists
        if (blueprint) {
            payload.permissionBlueprintId = blueprint._id;
        }
        else {
            delete payload.permissionBlueprintId;
        }
    }
    // Hash password if updated
    if (payload.password) {
        payload.password = await bcrypt_1.default.hash(payload.password, 10);
    }
    const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
    return updatedUser;
};
const togglePermissionDeletion = async (userId, permissionId) => {
    // Check user
    const user = await user_model_1.UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    // Customers cannot have permissions
    if (!user.permissionBlueprintId) {
        throw new Error("Customer does not have permissions.");
    }
    // Check permission
    const permission = await permissin_model_1.PermissionModel.findById(permissionId);
    if (!permission) {
        throw new Error("Permission not found");
    }
    // Check whether permission is already blocked
    const exists = user.blockedPermissionIds.some((id) => id.toString() === permissionId);
    const update = exists
        ? {
            $pull: {
                blockedPermissionIds: new mongoose_1.Types.ObjectId(permissionId),
            },
        }
        : {
            $addToSet: {
                blockedPermissionIds: new mongoose_1.Types.ObjectId(permissionId),
            },
        };
    const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(userId, update, {
        new: true,
        runValidators: true,
    })
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
    return updatedUser;
};
const getAllUsers = async (query, currentUserRole) => {
    const filter = {
        isDeleted: query.isDeleted ?? false,
    };
    if (query.id) {
        filter._id = query.id;
    }
    if (query.email) {
        filter.email = {
            $regex: query.email,
            $options: "i",
        };
    }
    if (query.phone) {
        filter.phone = {
            $regex: query.phone,
            $options: "i",
        };
    }
    if (query.name) {
        filter.name = {
            $regex: query.name,
            $options: "i",
        };
    }
    // Search by role
    if (query.role) {
        const role = await role_model_1.RoleModel.findOne({
            name: query.role,
            isDeleted: false,
        });
        if (!role) {
            return [];
        }
        filter.roleId = role._id;
    }
    // Employee can only search customers
    if (currentUserRole === "Employee") {
        const customerRole = await role_model_1.RoleModel.findOne({
            name: "Customer",
            isDeleted: false,
        });
        if (!customerRole) {
            return [];
        }
        filter.roleId = customerRole._id;
    }
    const users = await user_model_1.UserModel.find(filter)
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
    return users;
};
exports.userService = {
    createUser,
    createCustomer,
    updateUser,
    togglePermissionDeletion,
    getAllUsers,
};
