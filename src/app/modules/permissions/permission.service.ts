import { PermissionModel } from "./permissin.model";
import { IPermission } from "./permission.interface";


const createPermission = async (payload: IPermission) => {
  const permission = await PermissionModel.create(payload);
  return permission;
};

const getAllPermissions = async (query: Record<string, unknown>) => {
  const filter: Record<string, unknown> = {
    isDeleted: false,
  };
  if (query.id) {
    filter._id = query.id;
  }
  if (query.isDeleted !== undefined) {
    filter.isDeleted = query.isDeleted;
  }
  if (query.name) {
    filter.name = query.name;
  }
  if (query.code) {
    filter.code = query.code;
  }
  if (query.module) {
    filter.module = query.module;
  }
  const permissions = await PermissionModel.find(filter);

  return permissions;
};

const getSinglePermission = async (id: string) => {
  const permission = await PermissionModel.findOne({
    _id: id,
    isDeleted: false,
  });

  return permission;
};

const updatePermission = async (
  id: string,
  payload: Partial<IPermission>
) => {
  const updatedPermission = await PermissionModel.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedPermission;
};

const toggleDeletePermission = async (id: string) => {
  const permission = await PermissionModel.findById(id);

  if (!permission) {
    throw new Error("Permission not found");
  }

  permission.isDeleted = !permission.isDeleted;

  await permission.save();

  return permission;
};

const getAllModules = async () => {
  const modules = await PermissionModel.distinct("module", {
    isDeleted: false,
  });

  return modules;
};

export const permissionService = {
  createPermission,
  getAllPermissions,
  getSinglePermission,
  getAllModules,
  updatePermission,
  toggleDeletePermission,
};