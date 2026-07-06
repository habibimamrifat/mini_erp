import { Router } from "express";
import { RoleRoutes } from "../modules/roles/role.route";
import { PermissionRoutes } from "../modules/permissions/permission.route";


const router = Router();

const moduleRoutes = [
  {
    path: "/roles",
    route: RoleRoutes,
  },
  {
    path: "/permissions",
    route: PermissionRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;