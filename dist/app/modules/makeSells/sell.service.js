"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../users/user.model");
const product_model_1 = require("../product/product.model");
const sell_model_1 = require("./sell.model");
const createSale = async (salesmanId, payload) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Check salesman
        const salesman = await user_model_1.UserModel.findById(salesmanId).session(session);
        if (!salesman) {
            throw new Error("Salesman not found");
        }
        // Check customer
        const customer = await user_model_1.UserModel.findById(payload.customerId).session(session);
        if (!customer) {
            throw new Error("Customer not found");
        }
        if (!payload.items || payload.items.length === 0) {
            throw new Error("No products selected.");
        }
        const saleItems = [];
        // Validate products & prepare sale items
        for (const item of payload.items) {
            const product = await product_model_1.ProductModel.findById(item.itemId).session(session);
            if (!product) {
                throw new Error("Product not found.");
            }
            if (product.inStock < item.quantity) {
                throw new Error(`${product.productName} has only ${product.inStock} items in stock.`);
            }
            const actualPrice = product.actualPrice;
            const sellingPrice = product.sellingPrice;
            saleItems.push({
                itemId: product._id,
                quantity: item.quantity,
                actualPrice,
                sellingPrice,
                totalPriceForThisItem: sellingPrice * item.quantity,
                profitAmount: (sellingPrice - actualPrice) * item.quantity,
            });
        }
        // Reduce stock
        for (const item of saleItems) {
            await product_model_1.ProductModel.findByIdAndUpdate(item.itemId, {
                $inc: {
                    inStock: -item.quantity,
                },
            }, {
                session,
            });
        }
        // Create sale
        const [sale] = await sell_model_1.SaleModel.create([
            {
                salesmanId,
                customerId: payload.customerId,
                items: saleItems,
            },
        ], {
            session,
        });
        await session.commitTransaction();
        return await sell_model_1.SaleModel.findById(sale._id)
            .populate("salesmanId")
            .populate("customerId")
            .populate("items.itemId");
    }
    catch (error) {
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
};
exports.saleService = {
    createSale,
};
