interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: string;
  calories?: number;
  expirationDate: Date;
}

type IFoodProductRequest = Omit<IProduct, "id" | "expirationDate">;

type ICleaningProductRequest = Omit<
  IProduct,
  "id" | "expirationDate" | "calories"
>;

export { IProduct,  IFoodProductRequest, ICleaningProductRequest}
