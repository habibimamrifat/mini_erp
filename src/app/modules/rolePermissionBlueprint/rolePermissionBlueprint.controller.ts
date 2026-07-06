import { Request, Response } from "express";
import { rolePermissionBlueprintService } from "./rolePermissinBlueprint.service";


const createRolePermissionBlueprint = async (
  req: Request,
  res: Response
) => {
  const result =
    await rolePermissionBlueprintService.createRolePermissionBlueprint(
      req.body
    );

  res.status(201).json({
    success: true,
    message: "Blueprint created successfully",
    data: result,
  });
};

const getAllRolePermissionBlueprints = async (
  req: Request,
  res: Response
) => {
  const result =
    await rolePermissionBlueprintService.getAllRolePermissionBlueprints(
      req.query as Record<string, unknown>
    );

  res.status(200).json({
    success: true,
    message: "Blueprints retrieved successfully",
    data: result,
  });
};

const updateRolePermissionBlueprint = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params as { id: string };

  const result =
    await rolePermissionBlueprintService.updateRolePermissionBlueprint(
      id,
      req.body
    );

  res.status(200).json({
    success: true,
    message: "Blueprint updated successfully",
    data: result,
  });
};

const deleteRolePermissionBlueprint = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params as { id: string };

  const result =
    await rolePermissionBlueprintService.deleteRolePermissionBlueprint(id);

  res.status(200).json({
    success: true,
    message: "Blueprint deleted successfully",
    data: result,
  });
};

const updateBlueprintPermission = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params as { id: string };
  const { permissionId, action } = req.body;

  const result =
    await rolePermissionBlueprintService.updateBlueprintPermission(
      id,
      permissionId,
      action
    );

  res.status(200).json({
    success: true,
    message: `Permission ${action}ed successfully`,
    data: result,
  });
};

export const RolePermissionBlueprintController = {
  createRolePermissionBlueprint,
  getAllRolePermissionBlueprints,
  updateRolePermissionBlueprint,
  deleteRolePermissionBlueprint,
  updateBlueprintPermission
};