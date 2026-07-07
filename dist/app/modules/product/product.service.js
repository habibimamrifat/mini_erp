"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProduct = async (payload) => {
    const existingProduct = await product_model_1.ProductModel.findOne({
        sku: payload.sku,
    });
    if (existingProduct) {
        throw new Error("SKU already exists");
    }
    return await product_model_1.ProductModel.create(payload);
};
const getAllProducts = async (query) => {
    const filter = {
        isDeleted: query.isDeleted ?? false,
    };
    if (query.id) {
        filter._id = query.id;
    }
    if (query.productName) {
        filter.productName = {
            $regex: query.productName,
            $options: "i",
        };
    }
    if (query.sku) {
        filter.sku = {
            $regex: query.sku,
            $options: "i",
        };
    }
    return await product_model_1.ProductModel.find(filter);
};
const updateProduct = async (id, payload) => {
    const product = await product_model_1.ProductModel.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    if (payload.sku) {
        const existingSku = await product_model_1.ProductModel.findOne({
            sku: payload.sku,
            _id: { $ne: id },
        });
        if (existingSku) {
            throw new Error("SKU already exists");
        }
    }
    return await product_model_1.ProductModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};
const toggleDeleteProduct = async (id) => {
    const product = await product_model_1.ProductModel.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return await product_model_1.ProductModel.findByIdAndUpdate(id, {
        isDeleted: !product.isDeleted,
    }, {
        new: true,
        runValidators: true,
    });
};
exports.productService = {
    createProduct,
    getAllProducts,
    updateProduct,
    toggleDeleteProduct,
};
