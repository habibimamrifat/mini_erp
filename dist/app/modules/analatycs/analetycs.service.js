"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const mongoose_1 = require("mongoose");
const sell_model_1 = require("../makeSells/sell.model");
const getUserAnalytics = async (userId) => {
    const activeSold = await sell_model_1.SaleModel.find({
        salesmanId: new mongoose_1.Types.ObjectId(userId),
    })
        .populate("customerId")
        .populate("items.itemId");
    let totalRevenue = 0;
    let totalProfit = 0;
    let totalQuantitySold = 0;
    const salesHistory = activeSold.map((sale) => {
        let saleRevenue = 0;
        let saleProfit = 0;
        let saleQuantity = 0;
        sale.items.forEach((item) => {
            saleRevenue += item.totalPriceForThisItem;
            saleProfit += item.profitAmount;
            saleQuantity += item.quantity;
            totalRevenue += item.totalPriceForThisItem;
            totalProfit += item.profitAmount;
            totalQuantitySold += item.quantity;
        });
        return {
            saleId: sale._id,
            customer: sale.customerId,
            totalItems: saleQuantity,
            totalRevenue: saleRevenue,
            totalProfit: saleProfit,
            soldAt: sale.createdAt,
            items: sale.items,
        };
    });
    return {
        summary: {
            totalSales: activeSold.length,
            totalRevenue,
            totalProfit,
            totalQuantitySold,
        },
        salesHistory,
    };
};
exports.analyticsService = {
    getUserAnalytics,
};
