import { Router } from "express";
import { RoleRoutes } from "../modules/roles/role.route";
import { PermissionRoutes } from "../modules/permissions/permission.route";
import { RolePermissionBlueprintRoutes } from "../modules/rolePermissionBlueprint/rolePermissiionBlueprint.route";
import { UserRoutes } from "../modules/users/user.route";
import { ProductRoutes } from "../modules/product/product.route";
import { SaleRoutes } from "../modules/makeSells/sell.route";
import { AnalyticsRoutes } from "../modules/analatycs/analetycs.route";


const router = Router();

const moduleRoutes = [
  {
    path: "/roles",
    route: RoleRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/analytics",
    route: AnalyticsRoutes,
  },
  {
    path: "/sells",
    route: SaleRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/permissions",
    route: PermissionRoutes,
  },
    {
    path: "/role-permissions-blueprint",
    route: RolePermissionBlueprintRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;