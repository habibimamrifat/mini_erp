import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const createUser = async (req: Request, res: Response) => {
  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path, "users");
    req.body.img = imageUrl;
  }
  const result = await userService.createUser(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User created successfully",
    data: result,
  });
};

const createCustomer = async (req: Request, res: Response) => {
  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path, "users");
    req.body.img = imageUrl;
  }

  const result = await userService.createCustomer(req.body);
  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Customer created successfully",
    data: result,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path, "users");
    req.body.img = imageUrl;
  }

  const result = await userService.updateUser(id, req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: result,
  });
};

const togglePermissionDeletion = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { permissionId } = req.body;

  const result = await userService.togglePermissionDeletion(id, permissionId);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
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
    "Admin"
  );

  return sendResponse(res, {
    success: true,
    statusCode: 200,
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
