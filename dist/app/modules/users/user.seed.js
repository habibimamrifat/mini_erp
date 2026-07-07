"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const role_model_1 = require("../roles/role.model");
const relePermissionBlueprint_model_1 = require("../rolePermissionBlueprint/relePermissionBlueprint.model");
const seedAdmin = async () => {
    const existingAdmin = await user_model_1.UserModel.findOne({
        email: config_1.default.admin_email,
    });
    if (existingAdmin) {
        return existingAdmin;
    }
    const adminRole = await role_model_1.RoleModel.findOne({
        name: "Admin",
        isDeleted: false,
    });
    if (!adminRole) {
        throw new Error("Admin role not found.");
    }
    const blueprint = await relePermissionBlueprint_model_1.RolePermissionBlueprintModel.findOne({
        roleId: adminRole._id,
    });
    if (!blueprint) {
        throw new Error("Admin permission blueprint not found.");
    }
    const hashedPassword = await bcrypt_1.default.hash(config_1.default.admin_password, 10);
    const admin = await user_model_1.UserModel.create({
        name: "Super Admin",
        email: config_1.default.admin_email,
        phone: config_1.default.admin_phone,
        password: hashedPassword,
        roleId: adminRole._id,
        permissionBlueprintId: blueprint._id,
        blockedPermissionIds: [],
        img: "",
        isDeleted: false,
    });
    return user_model_1.UserModel.findById(admin._id)
        .populate("roleId")
        .populate("permissionBlueprintId")
        .populate("blockedPermissionIds");
};
exports.seedAdmin = seedAdmin;
