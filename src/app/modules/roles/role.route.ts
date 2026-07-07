import { Router } from "express";
import { RoleController } from "./role.controller";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.post(
  "/createRole",
  auth,
  accessControl({
    key: "CREATE_ROLE",
    name: "Create Role",
    description: "Allows creating roles",
    requiredModuleAccess: ["role"],
    requiredPermissionAccess: ["role:create"],
  }),
  RoleController.createRole,
);
router.get(
  "/getAllRoles",
  auth,
  accessControl({
    key: "READ_ROLES",
    name: "Read Roles",
    description: "Allows reading roles",
    requiredModuleAccess: ["role"],
    requiredPermissionAccess: ["role:read"],
  }),
  RoleController.getAllRoles,
);
router.get(
  "/getSingleRole/:id",
  auth,
  accessControl({
    key: "READ_ROLE",
    name: "Read Role",
    description: "Allows reading a single role",
    requiredModuleAccess: ["role"],
    requiredPermissionAccess: ["role:read"],
  }),
  RoleController.getSingleRole,
);
router.patch(
  "/updateRole/:id",
  auth,
  accessControl({
    key: "UPDATE_ROLE",
    name: "Update Role",
    description: "Allows updating roles",
    requiredModuleAccess: ["role"],
    requiredPermissionAccess: ["role:update"],
  }),
  RoleController.updateRole,
);
router.delete(
  "/toggleDeleteRole/:id",
  auth,
  accessControl({
    key: "DELETE_ROLE",
    name: "Delete Role",
    description: "Allows deleting roles",
    requiredModuleAccess: ["role"],
    requiredPermissionAccess: ["role:delete"],
  }),
  RoleController.toggleDeleteRole,
);

export const RoleRoutes = router;