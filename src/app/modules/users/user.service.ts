import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { RoleModel } from "../roles/role.model";
import { RolePermissionBlueprintModel } from "../rolePermissionBlueprint/relePermissionBlueprint.model";
import { PermissionModel } from "../permissions/permissin.model";
import { Types } from "mongoose";

interface IUserQuery {
  id?: string;
  email?: string;
  phone?: string;
  name?: string;
  role?: string;
  isDeleted?: boolean;
}

const createUser = async (payload: Partial<IUser>) => {
  // Validate required fields
  if (!payload.roleId) {
    throw new Error("Role is required");
  }

  if (!payload.password) {
    throw new Error("Password is required");
  }

  // Check role
  const role = await RoleModel.findById(payload.roleId);

  if (!role) {
    throw new Error("Role not found");
  }

  // Find blueprint for this role
  const blueprint = await RolePermissionBlueprintModel.findOne({
    roleId: role._id,
  });

  // Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Build create payload
  const userPayload: Partial<IUser> = {
    ...payload,
    password: hashedPassword,
    blockedPermissionIds: [],
  };

  // Only set blueprint if one exists
  if (blueprint) {
    userPayload.permissionBlueprintId = blueprint._id;
  }

  const user = await UserModel.create(userPayload);

  return await UserModel.findById(user._id)
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");
};

const createCustomer = async (payload: Partial<IUser>) => {
  const role = await RoleModel.findOne({
    name: "Customer",
    isDeleted: false,
  });

  if (!role) {
    throw new Error("Customer role not found");
  }

  const user = await UserModel.create({
    ...payload,
    password: "",
    roleId: role._id,
    blockedPermissionIds: [],
  });

  return await UserModel.findById(user._id)
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  // Check user exists
  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // If role changes
  if (payload.roleId) {
    const role = await RoleModel.findById(payload.roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    const blueprint = await RolePermissionBlueprintModel.findOne({
      roleId: role._id,
    });

    // Only assign if blueprint exists
    if (blueprint) {
      payload.permissionBlueprintId = blueprint._id;
    } else {
      delete payload.permissionBlueprintId;
    }
  }

  // Hash password if updated
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");

  return updatedUser;
};

const togglePermissionDeletion = async (
  userId: string,
  permissionId: string,
) => {
  // Check user
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Customers cannot have permissions
  if (!user.permissionBlueprintId) {
    throw new Error("Customer does not have permissions.");
  }

  // Check permission
  const permission = await PermissionModel.findById(permissionId);

  if (!permission) {
    throw new Error("Permission not found");
  }

  // Check whether permission is already blocked
  const exists = user.blockedPermissionIds.some(
    (id) => id.toString() === permissionId,
  );

  const update = exists
    ? {
        $pull: {
          blockedPermissionIds: new Types.ObjectId(permissionId),
        },
      }
    : {
        $addToSet: {
          blockedPermissionIds: new Types.ObjectId(permissionId),
        },
      };

  const updatedUser = await UserModel.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  })
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");

  return updatedUser;
};

const getAllUsers = async (query: IUserQuery, currentUserRole: string) => {
  const filter: Record<string, unknown> = {
    isDeleted: query.isDeleted ?? false,
  };

  if (query.id) {
    filter._id = query.id;
  }

  if (query.email) {
    filter.email = {
      $regex: query.email,
      $options: "i",
    };
  }

  if (query.phone) {
    filter.phone = {
      $regex: query.phone,
      $options: "i",
    };
  }

  if (query.name) {
    filter.name = {
      $regex: query.name,
      $options: "i",
    };
  }

  // Search by role
  if (query.role) {
    const role = await RoleModel.findOne({
      name: query.role,
      isDeleted: false,
    });

    if (!role) {
      return [];
    }

    filter.roleId = role._id;
  }

  // Employee can only search customers
  if (currentUserRole === "Employee") {
    const customerRole = await RoleModel.findOne({
      name: "Customer",
      isDeleted: false,
    });

    if (!customerRole) {
      return [];
    }

    filter.roleId = customerRole._id;
  }

  const users = await UserModel.find(filter)
    .populate("roleId")
    .populate("permissionBlueprintId")
    .populate("blockedPermissionIds");

  return users;
};

export const userService = {
  createUser,
  createCustomer,
  updateUser,
  togglePermissionDeletion,
  getAllUsers,
};
