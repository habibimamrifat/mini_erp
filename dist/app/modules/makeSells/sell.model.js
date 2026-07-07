"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    salesmanId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    items: [
        {
            itemId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            actualPrice: {
                type: Number,
                required: true,
            },
            sellingPrice: {
                type: Number,
                required: true,
            },
            totalPriceForThisItem: {
                type: Number,
                required: true,
            },
            profitAmount: {
                type: Number,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.SaleModel = (0, mongoose_1.model)("Sale", saleSchema);
