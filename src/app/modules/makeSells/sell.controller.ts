import { Request, Response } from "express";
import { saleService } from "./sell.service";


const createSale = async (
  req: Request,
  res: Response
) => {
  // Later this will come from JWT
  const { salesmanId } = req.body;

  const result = await saleService.createSale(
    salesmanId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Sale created successfully",
    data: result,
  });
};

export const SaleController = {
  createSale,
};