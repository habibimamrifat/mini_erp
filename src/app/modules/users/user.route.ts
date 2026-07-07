import { Router } from "express";
import { UserController } from "./user.controller";
import { upload } from "../../middlewares/multer";

const router = Router();

router.post("/createUser",upload.single("img"), UserController.createUser);

router.post("/createCustomer",upload.single("img"), UserController.createCustomer);

router.patch("/updateUser/:id",upload.single("img"), UserController.updateUser);

router.patch(
  "/togglePermissionDeletion/:id",
  UserController.togglePermissionDeletion
);

router.get("/getAllUsers", UserController.getAllUsers);

export const UserRoutes = router;