import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { PermissionModel } from "../permissions/permissin.model";
import { RoleModel } from "../roles/role.model";
import { RolePermissionBlueprintModel } from "./relePermissionBlueprint.model";
import { IRolePermissionBlueprint } from "./rolePermissionBlueprint.interface";


const createRolePermissionBlueprint = async (
  payload: IRolePermissionBlueprint
) => {
  // Check if the role exists
  const role = await RoleModel.findById(payload.roleId);

  if (!role) {
    throw new AppError(httpStatus.NOT_FOUND, "Role not found.");
  }

  // Check if a blueprint already exists for the role
  const existingBlueprint = await RolePermissionBlueprintModel.findOne({
    roleId: payload.roleId,
  });

  if (existingBlueprint) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A permission blueprint already exists for this role. You may update it instead."
    );
  }

  // Check that all permission IDs exist
  const permissions = await PermissionModel.find({
    _id: { $in: payload.permissionIds },
    isDeleted: false,
  }).select("_id");

  const foundPermissionIds = new Set(
    permissions.map((permission) => permission._id.toString())
  );

  const invalidPermissionIds = payload.permissionIds.filter(
    (id) => !foundPermissionIds.has(id.toString())
  );

  if (invalidPermissionIds.length > 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The following permission IDs are invalid: ${invalidPermissionIds.join(
        ", "
      )}`
    );
  }

  // Create blueprint
  const blueprint = await RolePermissionBlueprintModel.create(payload);

  return blueprint;
};




const getAllRolePermissionBlueprints = async (
  query: Record<string, unknown>
) => {
  const filter: Record<string, unknown> = {};

  if (query.id) {
    filter._id = query.id;
  }

  if (query.name) {
    filter.name = query.name;
  }

  if (query.roleId) {
    filter.roleId = query.roleId;
  }

  const blueprints = await RolePermissionBlueprintModel.find(filter)
    .populate("roleId")
    .populate("permissionIds");

  return blueprints;
};

const updateRolePermissionBlueprint = async (
  id: string,
  payload: Partial<IRolePermissionBlueprint>
) => {
  const updatedBlueprint =
    await RolePermissionBlueprintModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })
      .populate("roleId")
      .populate("permissionIds");

  return updatedBlueprint;
};

const deleteRolePermissionBlueprint = async (id: string) => {
  const deletedBlueprint =
    await RolePermissionBlueprintModel.findByIdAndDelete(id);

  return deletedBlueprint;
};

const updateBlueprintPermission = async (
  blueprintId: string,
  permissionId: string,
  action: "add" | "remove"
) => {
  // Check if blueprint exists
  const blueprint = await RolePermissionBlueprintModel.findById(blueprintId);

  if (!blueprint) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Role Permission Blueprint not found."
    );
  }

  // Check if permission exists
  const permission = await PermissionModel.findById(permissionId);

  if (!permission) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Permission not found."
    );
  }

  const hasPermission = blueprint.permissionIds.some(
    (id) => id.toString() === permissionId
  );

  if (action === "add" && hasPermission) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Permission already exists in this blueprint."
    );
  }

  if (action === "remove" && !hasPermission) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Permission is not assigned to this blueprint."
    );
  }

  const update =
    action === "add"
      ? {
          $addToSet: {
            permissionIds: permissionId,
          },
        }
      : {
          $pull: {
            permissionIds: permissionId,
          },
        };

  const updatedBlueprint =
    await RolePermissionBlueprintModel.findByIdAndUpdate(
      blueprintId,
      update,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("roleId")
      .populate("permissionIds");

  return updatedBlueprint;
};



export const rolePermissionBlueprintService = {
  createRolePermissionBlueprint,
  getAllRolePermissionBlueprints,
  updateRolePermissionBlueprint,
  deleteRolePermissionBlueprint,
  updateBlueprintPermission,
 
};