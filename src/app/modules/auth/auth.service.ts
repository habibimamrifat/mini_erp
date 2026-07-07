import bcrypt from "bcrypt";
import { UserModel } from "../users/user.model";
import { jwtService } from "../../services/jwt.service";

const login = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({
    email: payload.email,
    isDeleted: false,
  })
    .populate({
      path: "roleId",
      select: "name",
    })
    .populate({
      path: "permissionBlueprintId",
      select: "name permissionIds",
      populate: {
        path: "permissionIds",
        select: "name code module",
      },
    })
    .populate({
      path: "blockedPermissionIds",
      select: "name code module",
    })
    .select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  if (!user.password) {
    throw new Error(
      "Password is not set for this user. Please contact support."
    );
  }

  const matched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!matched) {
    throw new Error("Invalid email or password.");
  }

  // ============================
  // Extract permissions directly
  // ============================

  const permissions =
    (user.permissionBlueprintId as any)?.permissionIds || [];

  const permissionCodes = permissions.map(
    (permission: any) => permission.code
  );

  const permissionModules = [
    ...new Set(
      permissions.map((permission: any) => permission.module)
    ),
  ];

  const blockedPermissionCodes = (
    user.blockedPermissionIds as any[]
  ).map((permission) => permission.code);

  // ============================
  // JWT Payload
  // ============================

  const jwtPayload = {
    userId: user._id,

    roleId: (user.roleId as any)._id,
    roleName: (user.roleId as any).name,

    permissionCodes,
    permissionModules,

    blockedPermissionCodes,
  };

  const accessToken =
    jwtService.createAccessToken(jwtPayload);

  const refreshToken =
    jwtService.createRefreshToken({
      userId: user._id,
    });

  return {
    user,
    // jwtPayload,
    accessToken,
    refreshToken,
  };
};

export const authService = {
  login,
};