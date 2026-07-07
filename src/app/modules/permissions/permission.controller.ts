import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { permissionService } from "./permission.service";

const createPermission = async (req: Request, res: Response) => {
  const result = await permissionService.createPermission(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
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

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permissions retrieved successfully",
    data: result,
  });
};

const getSinglePermission = async (req: Request, res: Response) => {
  const result = await permissionService.getSinglePermission(
    req.params.id as string
  );

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permission retrieved successfully",
    data: result,
  });
};

const updatePermission = async (req: Request, res: Response) => {
  const result = await permissionService.updatePermission(
    req.params.id as string,
    req.body
  );

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permission updated successfully",
    data: result,
  });
};

const toggleDeletePermission = async (req: Request, res: Response) => {
  const result = await permissionService.toggleDeletePermission(
    req.params.id as string
  );

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Permission status updated successfully",
    data: result,
  });
};

const getAllModules = async (req: Request, res: Response) => {
  const result = await permissionService.getAllModules();

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Modules retrieved successfully",
    data: result,
  });
};

export const PermissionController = {
  createPermission,
  getAllModules,
  getAllPermissions,
  getSinglePermission,
  updatePermission,
  toggleDeletePermission,
};