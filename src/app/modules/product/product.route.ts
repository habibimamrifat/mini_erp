import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

router.post("/createProduct", ProductController.createProduct);

router.get("/getAllProducts", ProductController.getAllProducts);

router.patch("/updateProduct/:id", ProductController.updateProduct);

router.patch(
  "/toggleDeleteProduct/:id",
  ProductController.toggleDeleteProduct
);

export const ProductRoutes = router;