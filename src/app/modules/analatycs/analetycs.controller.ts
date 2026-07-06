import { Request, Response } from "express";
import { analyticsService } from "./analetycs.service";


const getUserAnalytics = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params as { userId: string };

  const result = await analyticsService.getUserAnalytics(userId);

  res.status(200).json({
    success: true,
    message: "User analytics retrieved successfully",
    data: result,
  });
};

export const AnalyticsController = {
  getUserAnalytics,
};