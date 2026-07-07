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
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:create"],
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
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
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
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
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
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
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
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:delete"],
  }),
  RoleController.toggleDeleteRole,
);

export const RoleRoutes = router;