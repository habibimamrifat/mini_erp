"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoutes = void 0;
const express_1 = require("express");
const sell_controller_1 = require("./sell.controller");
const router = (0, express_1.Router)();
router.post("/createSale", sell_controller_1.SaleController.createSale);
exports.SaleRoutes = router;
