export interface IProduct {
  productName: string;
  productImg?: string;

  sku: string;

  actualPrice: number;
  sellingPrice: number;
  inStock: number;

  isDeleted: boolean;
}