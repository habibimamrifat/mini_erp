import { Router } from "express";
import { SaleController } from "./sell.controller";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.post(
  "/createSale",
  auth,
  accessControl({
    key: "CREATE_SALE",
    name: "Create Sale",
    description: "Allows creating sales",
    requiredModuleAccess: ["sales"],
    requiredPermissionAccess: ["sales:create"],
  }),
  SaleController.createSale,
);

router.get(
  "/getSalesmanAnalytics",
  auth,
  accessControl({
    key: "READ_SALESMAN_ANALYTICS",
    name: "Read Salesman Analytics",
    description: "Allows reading salesman analytics",
    requiredModuleAccess: ["sales"],
    requiredPermissionAccess: ["sales:read"],
  }),
  SaleController.getSalesmanAnalytics,
);

export const SaleRoutes = router;