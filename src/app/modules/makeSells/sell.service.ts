import mongoose from "mongoose";
import { UserModel } from "../users/user.model";
import { ISale } from "./sell.interface";
import { ProductModel } from "../product/product.model";
import { SaleModel } from "./sell.model";
import { Types } from "mongoose";

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


const getSalesmanAnalytics = async (salesmanId: string) => {
  const sales = await SaleModel.aggregate([
    {
      $match: {
        salesmanId: new Types.ObjectId(salesmanId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "salesmanId",
        foreignField: "_id",
        as: "salesman",
      },
    },

    {
      $unwind: "$salesman",
    },

    {
      $lookup: {
        from: "users",
        localField: "customerId",
        foreignField: "_id",
        as: "customer",
      },
    },

    {
      $unwind: "$customer",
    },

    {
      $project: {
        saleId: "$_id",
        createdAt: 1,

        salesman: {
          _id: "$salesman._id",
          name: "$salesman.name",
          email: "$salesman.email",
        },

        customer: {
          _id: "$customer._id",
          name: "$customer.name",
        },

        totalItems: {
          $sum: "$items.quantity",
        },

        revenue: {
          $sum: "$items.totalPriceForThisItem",
        },

        profit: {
          $sum: "$items.profitAmount",
        },
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  if (!sales.length) {
    return {
      salesman: null,
      summary: {
        totalSales: 0,
        totalItemsSold: 0,
        totalRevenue: 0,
        totalProfit: 0,
      },
      sales: [],
    };
  }

  const summary = sales.reduce(
    (acc, sale) => {
      acc.totalSales++;

      acc.totalItemsSold += sale.totalItems;

      acc.totalRevenue += sale.revenue;

      acc.totalProfit += sale.profit;

      return acc;
    },
    {
      totalSales: 0,
      totalItemsSold: 0,
      totalRevenue: 0,
      totalProfit: 0,
    }
  );

  return {
    salesman: sales[0].salesman,
    summary,
    sales,
  };
};



export const saleService = {
  createSale,
  getSalesmanAnalytics
};
