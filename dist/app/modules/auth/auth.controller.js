"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const login = async (req, res) => {
    const result = await auth_service_1.authService.login(req.body);
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
};
exports.AuthController = {
    login,
};
