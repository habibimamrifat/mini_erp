import { Router } from "express";
import { SaleController } from "./sell.controller";


const router = Router();

router.post("/createSale", SaleController.createSale);

export const SaleRoutes = router;