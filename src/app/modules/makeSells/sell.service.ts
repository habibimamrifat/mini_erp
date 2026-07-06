import mongoose from "mongoose";
import { UserModel } from "../users/user.model";
import { ISale } from "./sell.interface";
import { ProductModel } from "../product/product.model";
import { SaleModel } from "./sell.model";

const createSale = async (salesmanId: string, payload: Partial<ISale>) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check salesman
    const salesman = await UserModel.findById(salesmanId).session(session);

    if (!salesman) {
      throw new Error("Salesman not found");
    }

    // Check customer
    const customer = await UserModel.findById(payload.customerId).session(
      session,
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!payload.items || payload.items.length === 0) {
      throw new Error("No products selected.");
    }

    const saleItems = [];

    // Validate products & prepare sale items
    for (const item of payload.items) {
      const product = await ProductModel.findById(item.itemId).session(session);

      if (!product) {
        throw new Error("Product not found.");
      }

      if (product.inStock < item.quantity) {
        throw new Error(
          `${product.productName} has only ${product.inStock} items in stock.`,
        );
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
      await ProductModel.findByIdAndUpdate(
        item.itemId,
        {
          $inc: {
            inStock: -item.quantity,
          },
        },
        {
          session,
        },
      );
    }

    // Create sale
    const [sale] = await SaleModel.create(
      [
        {
          salesmanId,
          customerId: payload.customerId,
          items: saleItems,
        },
      ],
      {
        session,
      },
    );

    await session.commitTransaction();

    return await SaleModel.findById(sale._id)
      .populate("salesmanId")
      .populate("customerId")
      .populate("items.itemId");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const saleService = {
  createSale,
};
