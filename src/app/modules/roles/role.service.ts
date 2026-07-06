import { IRole } from "./role.interface";
import { RoleModel } from "./role.model";

const createRole = async (payload: IRole) => {
  const role = await RoleModel.create(payload);
  return role;
};

const getAllRoles = async (id?: string, isDeleted?: boolean) => {
  const query: Record<string, unknown> = {
    isDeleted: isDeleted ?? false,
  };
  if (id) {
    query._id = id;
  }
  const roles = await RoleModel.find(query);
  return roles;
};

const getSingleRole = async (id: string) => {
  const role = await RoleModel.findById(id);
  return role;
};

const updateRole = async (id: string, payload: Partial<IRole>) => {
  const updatedRole = await RoleModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedRole;
};

const toggleDeleteRole = async (id: string) => {
  const role = await RoleModel.findById(id);

  if (!role) {
    throw new Error("Role not found");
  }
  role.isDeleted = !role.isDeleted;
  await role.save();
  return role;
};

export const roleService = {
  createRole,
  getAllRoles,
  getSingleRole,
  updateRole,
  toggleDeleteRole,
};
