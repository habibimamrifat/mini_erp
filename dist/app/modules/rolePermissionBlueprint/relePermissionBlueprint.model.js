"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionBlueprintModel = void 0;
const mongoose_1 = require("mongoose");
const rolePermissionBlueprintSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    roleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    permissionIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Permission",
        },
    ],
}, {
    timestamps: true,
});
exports.RolePermissionBlueprintModel = (0, mongoose_1.model)("RolePermissionBlueprint", rolePermissionBlueprintSchema);
