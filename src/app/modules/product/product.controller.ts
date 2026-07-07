import { Request, Response } from "express";
import { productService } from "./product.service";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const createProduct = async (req: Request, res: Response) => {
  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path, "users");
    req.body.img = imageUrl;
  }

  if (!req.body.img) {
    return res.status(400).json({
      success: false,
      message: "Product image is required",
    });
  }

  const result = await productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: result,
  });
};

const getAllProducts = async (req: Request, res: Response) => {
  const { id, productName, sku, isDeleted } = req.query;

  const result = await productService.getAllProducts({
    id: id as string,
    productName: productName as string,
    sku: sku as string,
    isDeleted: isDeleted === undefined ? undefined : isDeleted === "true",
  });

  res.status(200).json({
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path, "users");
    req.body.img = imageUrl;
  }

  const result = await productService.updateProduct(id, req.body);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
};

const toggleDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const result = await productService.toggleDeleteProduct(id);

  res.status(200).json({
    success: true,
    message: "Product delete status updated successfully",
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
  updateProduct,
  toggleDeleteProduct,
};
