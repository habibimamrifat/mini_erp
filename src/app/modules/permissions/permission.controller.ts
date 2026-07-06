import { Request, Response } from "express";
import { permissionService } from "./permission.service";

const createPermission = async (req: Request, res: Response) => {
  const result = await permissionService.createPermission(req.body);

  res.status(201).json({
    success: true,
    message: "Permission created successfully",
    data: result,
  });
};

const getAllPermissions = async (req: Request, res: Response) => {
  const result = await permissionService.getAllPermissions({
    ...req.query,
    isDeleted:
      req.query.isDeleted !== undefined
        ? req.query.isDeleted === "true"
        : undefined,
  });

  res.status(200).json({
    success: true,
    message: "Permissions retrieved successfully",
    data: result,
  });
};


const getSinglePermission = async (req: Request, res: Response) => {
  const result = await permissionService.getSinglePermission(
    req.params.id as string
  );

  res.status(200).json({
    success: true,
    message: "Permission retrieved successfully",
    data: result,
  });
};


const updatePermission = async (req: Request, res: Response) => {
  const result = await permissionService.updatePermission(
    req.params.id as string,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Permission updated successfully",
    data: result,
  });
};

const toggleDeletePermission = async (req: Request, res: Response) => {
  const result = await permissionService.toggleDeletePermission(
    req.params.id as string
  );

  res.status(200).json({
    success: true,
    message: "Permission status updated successfully",
    data: result,
  });
};

export const PermissionController = {
  createPermission,
  getAllPermissions,
  getSinglePermission,
  updatePermission,
  toggleDeletePermission,
};