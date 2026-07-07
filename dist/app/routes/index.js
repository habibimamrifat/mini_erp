"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_route_1 = require("../modules/roles/role.route");
const permission_route_1 = require("../modules/permissions/permission.route");
const rolePermissiionBlueprint_route_1 = require("../modules/rolePermissionBlueprint/rolePermissiionBlueprint.route");
const user_route_1 = require("../modules/users/user.route");
const product_route_1 = require("../modules/product/product.route");
const sell_route_1 = require("../modules/makeSells/sell.route");
const analetycs_route_1 = require("../modules/analatycs/analetycs.route");
const auth_route_1 = require("../modules/auth/auth.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/roles",
        route: role_route_1.RoleRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/analytics",
        route: analetycs_route_1.AnalyticsRoutes,
    },
    {
        path: "/sells",
        route: sell_route_1.SaleRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/permissions",
        route: permission_route_1.PermissionRoutes,
    },
    {
        path: "/role-permissions-blueprint",
        route: rolePermissiionBlueprint_route_1.RolePermissionBlueprintRoutes,
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
