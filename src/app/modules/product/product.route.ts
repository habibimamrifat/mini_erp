import { Router } from "express";
import { ProductController } from "./product.controller";
import { upload } from "../../middlewares/multer";

const router = Router();

router.post("/createProduct",upload.single("img"), ProductController.createProduct);

router.get("/getAllProducts", ProductController.getAllProducts);

router.patch("/updateProduct/:id", upload.single("img"), ProductController.updateProduct);

router.patch(
  "/toggleDeleteProduct/:id",
  ProductController.toggleDeleteProduct
);

export const ProductRoutes = router;