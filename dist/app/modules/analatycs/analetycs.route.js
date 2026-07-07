"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRoutes = void 0;
const express_1 = require("express");
const analetycs_controller_1 = require("./analetycs.controller");
const router = (0, express_1.Router)();
router.get("/getUserAnalytics/:userId", analetycs_controller_1.AnalyticsController.getUserAnalytics);
exports.AnalyticsRoutes = router;
