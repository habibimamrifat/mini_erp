import { Schema, model } from "mongoose";
import { ISale } from "./sell.interface";

const saleSchema = new Schema<ISale>(
  {
    salesmanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        actualPrice: {
          type: Number,
          required: true,
        },
        sellingPrice: {
          type: Number,
          required: true,
        },
        totalPriceForThisItem: {
          type: Number,
          required: true,
        },
        profitAmount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const SaleModel = model<ISale>("Sale", saleSchema);
