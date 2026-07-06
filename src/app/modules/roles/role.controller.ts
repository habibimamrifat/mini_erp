import { Request, Response } from "express";
import { roleService } from "./role.service";

const createRole = async (req: Request, res: Response) => {

  const result = await roleService.createRole(req.body);

  res.status(201).json({
    success: true,
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

  res.status(200).json({
    success: true,
    message: "Roles retrieved successfully",
    data: result,
  });
};

const getSingleRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.getSingleRole(id);

  res.status(200).json({
    success: true,
    message: "Role retrieved successfully",
    data: result,
  });
};

const updateRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.updateRole(id, req.body);

  res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: result,
  });
};

const toggleDeleteRole = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await roleService.toggleDeleteRole(id);

  res.status(200).json({
    success: true,
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
