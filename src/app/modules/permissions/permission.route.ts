import { Router } from "express";
import { PermissionController } from "./permission.controller";

const router = Router();

router.post(
  "/createPermission",
  PermissionController.createPermission
);

router.get(
  "/getAllPermissions",
  PermissionController.getAllPermissions
);

router.get(
  "/getSinglePermission/:id",
  PermissionController.getSinglePermission
);

router.patch(
  "/updatePermission/:id",
  PermissionController.updatePermission
);

router.delete(
  "/toggleDeletePermission/:id",
  PermissionController.toggleDeletePermission
);

export const PermissionRoutes = router;