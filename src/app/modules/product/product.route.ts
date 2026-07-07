import { Router } from "express";
import { ProductController } from "./product.controller";
import { upload } from "../../middlewares/multer";
import { accessControl } from "../../middlewares/accessControl";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/createProduct",
  upload.single("img"),
  auth,
  accessControl({
    key: "CREATE_PRODUCT",
    name: "Create Product",
    description: "Allows creating products",
    requiredModuleAccess: ["product"],
    requiredPermissionAccess: ["product:create"],
  }),
  ProductController.createProduct,
);

router.get(
  "/getAllProducts",
  auth,
  accessControl({
    key: "READ_PRODUCTS",
    name: "Read Products",
    description: "Allows reading products",
    requiredModuleAccess: ["product"],
    requiredPermissionAccess: ["product:read"],
  }),
  ProductController.getAllProducts,
);

router.patch(
  "/updateProduct/:id",
  upload.single("img"),
  auth,
  accessControl({
    key: "UPDATE_PRODUCT",
    name: "Update Product",
    description: "Allows updating products",
    requiredModuleAccess: ["product"],
    requiredPermissionAccess: ["product:update"],
  }),
  ProductController.updateProduct,
);

router.patch(
  "/toggleDeleteProduct/:id",
  auth,
  accessControl({
    key: "DELETE_PRODUCT",
    name: "Delete Product",
    description: "Allows deleting products",
    requiredModuleAccess: ["product"],
    requiredPermissionAccess: ["product:delete"],
  }),
  ProductController.toggleDeleteProduct,
);

router.get(
  "/getAnalytics",
  auth,
  accessControl({
    key: "READ_PRODUCT_ANALYTICS",
    name: "Read Product Analytics",
    description: "Allows reading product analytics",
    requiredModuleAccess: ["product"],
    requiredPermissionAccess: ["product:read"],
  }),
  ProductController.getAnalytics,
);
export const ProductRoutes = router;
