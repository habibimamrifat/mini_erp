import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { saleService } from "./sell.service";

const createSale = async (req: Request, res: Response) => {
  const salesmanId = req?.user?.userId as string;
  const result = await saleService.createSale(salesmanId, req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Sale created successfully",
    data: result,
  });
};

const getSalesmanAnalytics = async (req: Request, res: Response) => {
  const salesmanId = req?.user?.userId as string;
  const result = await saleService.getSalesmanAnalytics(salesmanId);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Salesman analytics retrieved successfully",
    data: result,
  });
};

export const SaleController = {
  createSale,
  getSalesmanAnalytics
};