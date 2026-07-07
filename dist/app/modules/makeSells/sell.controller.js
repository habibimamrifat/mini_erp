"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleController = void 0;
const sell_service_1 = require("./sell.service");
const createSale = async (req, res) => {
    // Later this will come from JWT
    const { salesmanId } = req.body;
    const result = await sell_service_1.saleService.createSale(salesmanId, req.body);
    res.status(201).json({
        success: true,
        message: "Sale created successfully",
        data: result,
    });
};
exports.SaleController = {
    createSale,
};
