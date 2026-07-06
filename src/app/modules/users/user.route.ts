import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/createUser", UserController.createUser);

router.post("/createCustomer", UserController.createCustomer);

router.patch("/updateUser/:id", UserController.updateUser);

router.patch(
  "/togglePermissionDeletion/:id",
  UserController.togglePermissionDeletion
);

router.get("/getAllUsers", UserController.getAllUsers);

export const UserRoutes = router;