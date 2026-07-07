import { SaleModel } from "../makeSells/sell.model";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

interface IProductQuery {
  id?: string;
  productName?: string;
  sku?: string;
  isDeleted?: boolean;
}

const createProduct = async (payload: Partial<IProduct>) => {
  const existingProduct = await ProductModel.findOne({
    sku: payload.sku,
  });

  if (existingProduct) {
    throw new Error("SKU already exists");
  }

  return await ProductModel.create(payload);
};

const getAllProducts = async (query: IProductQuery) => {
  const filter: Record<string, unknown> = {
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

  return await ProductModel.find(filter);
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  if (payload.sku) {
    const existingSku = await ProductModel.findOne({
      sku: payload.sku,
      _id: { $ne: id },
    });

    if (existingSku) {
      throw new Error("SKU already exists");
    }
  }

  return await ProductModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const toggleDeleteProduct = async (id: string) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return await ProductModel.findByIdAndUpdate(
    id,
    {
      isDeleted: !product.isDeleted,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

const getAnalytics = async () => {
  // ----------------------------
  // Product Analytics
  // ----------------------------

  const totalProducts = await ProductModel.countDocuments({
    isDeleted: false,
  });

  const stockResult = await ProductModel.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: null,
        totalStockAvailable: {
          $sum: "$inStock",
        },
      },
    },
  ]);

  const totalStockAvailable =
    stockResult[0]?.totalStockAvailable ?? 0;

  const lowStockProducts = await ProductModel.find({
    isDeleted: false,
    inStock: {
      $lt: 5,
    },
  });

  // ----------------------------
  // Sales Analytics
  // ----------------------------

  const salesAnalytics = await SaleModel.aggregate([
    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.itemId",

        soldQuantity: {
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
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },

    {
      $project: {
        _id: 0,

        productId: "$product._id",

        productName: "$product.productName",

        sku: "$product.sku",

        soldQuantity: 1,

        revenue: 1,

        profit: 1,
      },
    },

    {
      $sort: {
        soldQuantity: -1,
      },
    },
  ]);

  // ----------------------------
  // Overview
  // ----------------------------

  const overview = salesAnalytics.reduce(
    (acc, product) => {
      acc.totalProductsSold += product.soldQuantity;
      acc.totalRevenue += product.revenue;
      acc.totalProfit += product.profit;

      return acc;
    },
    {
      totalProducts,
      totalStockAvailable,
      totalProductsSold: 0,
      totalRevenue: 0,
      totalProfit: 0,
    }
  );

  return {
    overview,
    lowStockProducts,
    topSellingProducts: salesAnalytics,
  };
};


export const productService = {
  createProduct,
  getAllProducts,
  updateProduct,
  toggleDeleteProduct,
  getAnalytics,
};