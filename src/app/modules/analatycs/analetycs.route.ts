import { Router } from "express";
import { AnalyticsController } from "./analetycs.controller";
import { auth } from "../../middlewares/auth";
import { accessControl } from "../../middlewares/accessControl";

const router = Router();

router.get(
  "/getUserAnalytics/:userId",
  auth,
  accessControl({
    key: "READ_USER_ANALYTICS",
    name: "Read User Analytics",
    description: "Allows reading user analytics",
    requiredModuleAccess: ["dashboard"],
    requiredPermissionAccess: ["dashboard:view"],
  }),
  AnalyticsController.getUserAnalytics,
);

export const AnalyticsRoutes = router;