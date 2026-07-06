import { Request, Response } from "express";
import { userService } from "./user.service";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { RoleModel } from "../roles/role.model";

const createUser = async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
};

const createCustomer = async (req: Request, res: Response) => {
  const result = await userService.createCustomer(req.body);

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: result,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const result = await userService.updateUser(id, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
};

const togglePermissionDeletion = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { permissionId } = req.body;

  const result = await userService.togglePermissionDeletion(id, permissionId);

  res.status(200).json({
    success: true,
    message: "Permission updated successfully",
    data: result,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const { id, email, phone, name, role, isDeleted } = req.query;

  const result = await userService.getAllUsers(
    {
      id: id as string,
      email: email as string,
      phone: phone as string,
      name: name as string,
      role: role as string,
      isDeleted: isDeleted === undefined ? undefined : isDeleted === "true",
    },
    "Admin", // Replace later with req.user.role after authentication
  );

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
};

export const UserController = {
  createUser,
  createCustomer,
  updateUser,
  togglePermissionDeletion,
  getAllUsers,
};
