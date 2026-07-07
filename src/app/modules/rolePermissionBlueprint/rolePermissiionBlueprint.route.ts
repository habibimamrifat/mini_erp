import { Router } from "express";
import { RolePermissionBlueprintController } from "./rolePermissionBlueprint.controller";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.post(
  "/createRolePermissionBlueprint",
  auth,
  accessControl({
    key: "CREATE_ROLE_PERMISSION_BLUEPRINT",
    name: "Create Role Permission Blueprint",
    description: "Allows creating role permission blueprints",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:create"],
  }),
  RolePermissionBlueprintController.createRolePermissionBlueprint,
);

router.get(
  "/getAllRolePermissionBlueprints",
  auth,
  accessControl({
    key: "READ_ROLE_PERMISSION_BLUEPRINTS",
    name: "Read Role Permission Blueprints",
    description: "Allows reading role permission blueprints",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
  }),
  RolePermissionBlueprintController.getAllRolePermissionBlueprints,
);

router.patch(
  "/updateRolePermissionBlueprint/:id",
  auth,
  accessControl({
    key: "UPDATE_ROLE_PERMISSION_BLUEPRINT",
    name: "Update Role Permission Blueprint",
    description: "Allows updating role permission blueprints",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
  }),
  RolePermissionBlueprintController.updateRolePermissionBlueprint,
);

router.delete(
  "/deleteRolePermissionBlueprint/:id",
  auth,
  accessControl({
    key: "DELETE_ROLE_PERMISSION_BLUEPRINT",
    name: "Delete Role Permission Blueprint",
    description: "Allows deleting role permission blueprints",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:delete"],
  }),
  RolePermissionBlueprintController.deleteRolePermissionBlueprint,
);

router.patch(
  "/updateBlueprintPermission/:id",
  auth,
  accessControl({
    key: "UPDATE_BLUEPRINT_PERMISSION",
    name: "Update Blueprint Permission",
    description: "Allows updating blueprint permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
  }),
  RolePermissionBlueprintController.updateBlueprintPermission,
);



export const RolePermissionBlueprintRoutes = router;