"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionService = void 0;
const permissin_model_1 = require("./permissin.model");
const createPermission = async (payload) => {
    const permission = await permissin_model_1.PermissionModel.create(payload);
    return permission;
};
const getAllPermissions = async (query) => {
    const filter = {
        isDeleted: false,
    };
    if (query.id) {
        filter._id = query.id;
    }
    if (query.isDeleted !== undefined) {
        filter.isDeleted = query.isDeleted;
    }
    if (query.name) {
        filter.name = query.name;
    }
    if (query.code) {
        filter.code = query.code;
    }
    if (query.module) {
        filter.module = query.module;
    }
    const permissions = await permissin_model_1.PermissionModel.find(filter);
    return permissions;
};
const getSinglePermission = async (id) => {
    const permission = await permissin_model_1.PermissionModel.findOne({
        _id: id,
        isDeleted: false,
    });
    return permission;
};
const updatePermission = async (id, payload) => {
    const updatedPermission = await permissin_model_1.PermissionModel.findOneAndUpdate({
        _id: id,
        isDeleted: false,
    }, payload, {
        new: true,
        runValidators: true,
    });
    return updatedPermission;
};
const toggleDeletePermission = async (id) => {
    const permission = await permissin_model_1.PermissionModel.findById(id);
    if (!permission) {
        throw new Error("Permission not found");
    }
    permission.isDeleted = !permission.isDeleted;
    await permission.save();
    return permission;
};
const getAllModules = async () => {
    const modules = await permissin_model_1.PermissionModel.distinct("module", {
        isDeleted: false,
    });
    return modules;
};
exports.permissionService = {
    createPermission,
    getAllPermissions,
    getSinglePermission,
    getAllModules,
    updatePermission,
    toggleDeletePermission,
};
