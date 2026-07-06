import { Router } from "express";
import { RolePermissionBlueprintController } from "./rolePermissionBlueprint.controller";

const router = Router();

router.post(
  "/createRolePermissionBlueprint",
  RolePermissionBlueprintController.createRolePermissionBlueprint
);

router.get(
  "/getAllRolePermissionBlueprints",
  RolePermissionBlueprintController.getAllRolePermissionBlueprints
);

router.patch(
  "/updateRolePermissionBlueprint/:id",
  RolePermissionBlueprintController.updateRolePermissionBlueprint
);

router.delete(
  "/deleteRolePermissionBlueprint/:id",
  RolePermissionBlueprintController.deleteRolePermissionBlueprint
);

router.patch(
  "/updateBlueprintPermission/:id",
  RolePermissionBlueprintController.updateBlueprintPermission
);

export const RolePermissionBlueprintRoutes = router;