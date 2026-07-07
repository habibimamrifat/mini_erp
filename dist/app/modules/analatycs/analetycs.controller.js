"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analetycs_service_1 = require("./analetycs.service");
const getUserAnalytics = async (req, res) => {
    const { userId } = req.params;
    const result = await analetycs_service_1.analyticsService.getUserAnalytics(userId);
    res.status(200).json({
        success: true,
        message: "User analytics retrieved successfully",
        data: result,
    });
};
exports.AnalyticsController = {
    getUserAnalytics,
};
