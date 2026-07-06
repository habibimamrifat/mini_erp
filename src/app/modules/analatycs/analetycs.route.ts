import { Router } from "express";
import { AnalyticsController } from "./analetycs.controller";


const router = Router();

router.get(
  "/getUserAnalytics/:userId",
  AnalyticsController.getUserAnalytics
);

export const AnalyticsRoutes = router;