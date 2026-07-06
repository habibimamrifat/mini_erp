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

export const productService = {
  createProduct,
  getAllProducts,
  updateProduct,
  toggleDeleteProduct,
};