import { Router } from "express";
import { RoleController } from "./role.controller";

const router = Router();

router.post("/createRole", RoleController.createRole);
router.get("/getAllRoles", RoleController.getAllRoles);
router.get("/getSingleRole/:id", RoleController.getSingleRole);
router.patch("/updateRole/:id", RoleController.updateRole);
router.delete("/toggleDeleteRole/:id", RoleController.toggleDeleteRole);


export const RoleRoutes = router;