import { PermissionModel } from "../permissions/permissin.model";
import { RolePermissionBlueprintModel } from "./relePermissionBlueprint.model";
import { IRolePermissionBlueprint } from "./rolePermissionBlueprint.interface";


const createRolePermissionBlueprint = async (
  payload: IRolePermissionBlueprint
) => {
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
    throw new Error("Role Permission Blueprint not found");
  }

  // Check if permission exists
  const permission = await PermissionModel.findById(permissionId);

  if (!permission) {
    throw new Error("Permission not found");
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
  updateBlueprintPermission
};