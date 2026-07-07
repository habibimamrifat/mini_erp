import { Router } from "express";
import { UserController } from "./user.controller";
import { upload } from "../../middlewares/multer";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.post(
  "/createUser",
  upload.single("img"),
  auth,
  accessControl({
    key: "CREATE_USER",
    name: "Create User",
    description: "Allows creating users",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:create"],
  }),
  UserController.createUser,
);

router.post(
  "/createCustomer",
  upload.single("img"),
  auth,
  accessControl({
    key: "CREATE_CUSTOMER",
    name: "Create Customer",
    description: "Allows creating customers",
    requiredModuleAccess: ["customer"],
    requiredPermissionAccess: ["customer:create"],
  }),
  UserController.createCustomer,
);

router.patch(
  "/updateUser/:id",
  upload.single("img"),
  auth,
  accessControl({
    key: "UPDATE_USER",
    name: "Update User",
    description: "Allows updating users",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
  }),
  UserController.updateUser,
);

router.patch(
  "/togglePermissionDeletion/:id",
  auth,
  accessControl({
    key: "UPDATE_USER_PERMISSION",
    name: "Update User Permission",
    description: "Allows updating user permissions",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:update"],
  }),
  UserController.togglePermissionDeletion,
);

router.get(
  "/getAllUsers",
  auth,
  accessControl({
    key: "READ_USERS",
    name: "Read Users",
    description: "Allows reading users",
    requiredModuleAccess: ["user"],
    requiredPermissionAccess: ["user:read"],
  }),
  UserController.getAllUsers,
);

export const UserRoutes = router;