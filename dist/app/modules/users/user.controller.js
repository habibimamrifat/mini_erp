"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const createUser = async (req, res) => {
    if (req.file) {
        const imageUrl = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.path, "users");
        req.body.img = imageUrl;
    }
    const result = await user_service_1.userService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
};
const createCustomer = async (req, res) => {
    if (req.file) {
        const imageUrl = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.path, "users");
        req.body.img = imageUrl;
    }
    const result = await user_service_1.userService.createCustomer(req.body);
    res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: result,
    });
};
const updateUser = async (req, res) => {
    const { id } = req.params;
    if (req.file) {
        const imageUrl = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.path, "users");
        req.body.img = imageUrl;
    }
    const result = await user_service_1.userService.updateUser(id, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
    });
};
const togglePermissionDeletion = async (req, res) => {
    const { id } = req.params;
    const { permissionId } = req.body;
    const result = await user_service_1.userService.togglePermissionDeletion(id, permissionId);
    res.status(200).json({
        success: true,
        message: "Permission updated successfully",
        data: result,
    });
};
const getAllUsers = async (req, res) => {
    const { id, email, phone, name, role, isDeleted } = req.query;
    const result = await user_service_1.userService.getAllUsers({
        id: id,
        email: email,
        phone: phone,
        name: name,
        role: role,
        isDeleted: isDeleted === undefined ? undefined : isDeleted === "true",
    }, "Admin");
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
};
exports.UserController = {
    createUser,
    createCustomer,
    updateUser,
    togglePermissionDeletion,
    getAllUsers,
};
