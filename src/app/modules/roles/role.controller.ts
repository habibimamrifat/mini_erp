import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { roleService } from "./role.service";

const createRole = async (req: Request, res: Response) => {
  const result = await roleService.createRole(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Role created successfully",
    data: result,
  });
};

const getAllRoles = async (req: Request, res: Response) => {
  const isDeleted =
    req.query.isDeleted !== undefined
      ? req.query.isDeleted === "true"
      : undefined;

  const result = await roleService.getAllRoles(undefined, isDeleted);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Roles retrieved successfully",
    data: result,
  });
};

const getSingleRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.getSingleRole(id);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Role retrieved successfully",
    data: result,
  });
};

const updateRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.updateRole(id, req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Role updated successfully",
    data: result,
  });
};

const toggleDeleteRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.toggleDeleteRole(id);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Role toggled successfully",
    data: result,
  });
};

export const RoleController = {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  toggleDeleteRole,
};
