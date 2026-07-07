import { Router } from "express";
import { PermissionController } from "./permission.controller";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.post(
  "/createPermission",
  auth,
  accessControl({
    key: "CREATE_PERMISSION",
    name: "Create Permission",
    description: "Allows creating permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:create"],
  }),
  PermissionController.createPermission,
);

router.get(
  "/getAllPermissions",
  auth,
  accessControl({
    key: "READ_PERMISSIONS",
    name: "Read Permissions",
    description: "Allows reading permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
  }),
  PermissionController.getAllPermissions,
);

router.get(
  "/getSinglePermission/:id",
  auth,
  accessControl({
    key: "READ_PERMISSION",
    name: "Read Permission",
    description: "Allows reading a single permission",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
  }),
  PermissionController.getSinglePermission,
);

router.patch(
  "/updatePermission/:id",
  auth,
  accessControl({
    key: "UPDATE_PERMISSION",
    name: "Update Permission",
    description: "Allows updating permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
  }),
  PermissionController.updatePermission,
);

router.delete(
  "/toggleDeletePermission/:id",
  auth,
  accessControl({
    key: "DELETE_PERMISSION",
    name: "Delete Permission",
    description: "Allows deleting permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:delete"],
  }),
  PermissionController.toggleDeletePermission,
);

router.get(
  "/getAllModules",
  auth,
  accessControl({
    key: "READ_MODULES",
    name: "Read Modules",
    description: "Allows reading modules",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
  }),
  PermissionController.getAllModules,
);

export const PermissionRoutes = router;
