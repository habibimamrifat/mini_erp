"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productImg: {
        type: String,
        default: "",
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    actualPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    sellingPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("Product", productSchema);
