"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,
        select: false,
    },
    roleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    permissionBlueprintId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "RolePermissionBlueprint",
        default: null,
        required: false,
    },
    blockedPermissionIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Permission",
        },
    ],
    img: {
        type: String,
        default: "",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
