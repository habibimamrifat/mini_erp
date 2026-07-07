import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { analyticsService } from "./analetycs.service";

const getUserAnalytics = async (req: Request, res: Response) => {
  const { userId } = req.params as { userId: string };

  const result = await analyticsService.getUserAnalytics(userId);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User analytics retrieved successfully",
    data: result,
  });
};

export const AnalyticsController = {
  getUserAnalytics,
};