"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const createProduct = async (req, res) => {
    if (req.file) {
        const imageUrl = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.path, "users");
        req.body.img = imageUrl;
    }
    if (!req.body.img) {
        return res.status(400).json({
            success: false,
            message: "Product image is required",
        });
    }
    const result = await product_service_1.productService.createProduct(req.body);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result,
    });
};
const getAllProducts = async (req, res) => {
    const { id, productName, sku, isDeleted } = req.query;
    const result = await product_service_1.productService.getAllProducts({
        id: id,
        productName: productName,
        sku: sku,
        isDeleted: isDeleted === undefined ? undefined : isDeleted === "true",
    });
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
};
const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (req.file) {
        const imageUrl = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.path, "users");
        req.body.img = imageUrl;
    }
    const result = await product_service_1.productService.updateProduct(id, req.body);
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: result,
    });
};
const toggleDeleteProduct = async (req, res) => {
    const { id } = req.params;
    const result = await product_service_1.productService.toggleDeleteProduct(id);
    res.status(200).json({
        success: true,
        message: "Product delete status updated successfully",
        data: result,
    });
};
exports.ProductController = {
    createProduct,
    getAllProducts,
    updateProduct,
    toggleDeleteProduct,
};
