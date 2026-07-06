import { Types } from "mongoose";

export interface ISaleItem {
  itemId: Types.ObjectId;

  quantity: number;

  actualPrice: number;
  sellingPrice: number;

  totalPriceForThisItem: number;

  profitAmount: number;
}

export interface ISale {
  salesmanId: Types.ObjectId;
  customerId: Types.ObjectId;
  createdAt: Date;

  items: ISaleItem[];
}