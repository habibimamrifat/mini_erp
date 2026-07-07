"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../users/user.model");
const jwt_service_1 = require("../../services/jwt.service");
const login = async (payload) => {
    const user = await user_model_1.UserModel.findOne({
        email: payload.email,
        isDeleted: false,
    })
        .populate({
        path: "roleId",
        select: "name",
    })
        .populate({
        path: "permissionBlueprintId",
        select: "name permissionIds",
        populate: {
            path: "permissionIds",
            select: "name code module",
        },
    })
        .populate({
        path: "blockedPermissionIds",
        select: "name code module",
    })
        .select("+password");
    if (!user) {
        throw new Error("Invalid email or password.");
    }
    if (!user.password) {
        throw new Error("Password is not set for this user. Please contact support.");
    }
    const matched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!matched) {
        throw new Error("Invalid email or password.");
    }
    // ============================
    // Extract permissions directly
    // ============================
    const permissions = user.permissionBlueprintId?.permissionIds || [];
    const permissionCodes = permissions.map((permission) => permission.code);
    const permissionModules = [
        ...new Set(permissions.map((permission) => permission.module)),
    ];
    const blockedPermissionCodes = user.blockedPermissionIds.map((permission) => permission.code);
    // ============================
    // JWT Payload
    // ============================
    const jwtPayload = {
        userId: user._id,
        roleId: user.roleId._id,
        roleName: user.roleId.name,
        permissionCodes,
        permissionModules,
        blockedPermissionCodes,
    };
    const accessToken = jwt_service_1.jwtService.createAccessToken(jwtPayload);
    const refreshToken = jwt_service_1.jwtService.createRefreshToken({
        userId: user._id,
    });
    return {
        user,
        // jwtPayload,
        accessToken,
        refreshToken,
    };
};
exports.authService = {
    login,
};
