import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { IRoutePolicy, registerPolicy } from "../registry/accessPolicyREgistry";


export const accessControl = (policy: IRoutePolicy) => {
  // Register this permission during application startup.
  // This is used only for syncing the Permission collection.
  registerPolicy(policy);

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as any;

      if (!user) {
        throw new AppError(401, "Unauthorized");
      }

      /**
       * -----------------------------------
       * Module Check
       * -----------------------------------
       */
      const hasModule = policy.requiredModuleAccess.every(
        (module) =>
          user.permissionModules.includes(module)
      );

      if (!hasModule) {
        throw new AppError(
          403,
          "You don't have access to this module."
        );
      }

      /**
       * -----------------------------------
       * Permission Check
       * -----------------------------------
       */
      const hasPermission =
        policy.requiredPermissionAccess.every(
          (permission) =>
            user.permissionCodes.includes(permission)
        );

      if (!hasPermission) {
        throw new AppError(
          403,
          "Permission denied."
        );
      }

      /**
       * -----------------------------------
       * Blocked Permission Check
       * -----------------------------------
       */
      const isBlocked =
        policy.requiredPermissionAccess.some(
          (permission) =>
            user.blockedPermissionCodes.includes(permission)
        );

      if (isBlocked) {
        throw new AppError(
          403,
          "This permission has been blocked for this user."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};