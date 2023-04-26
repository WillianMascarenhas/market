import { request, Request, response, Response } from "express";
import market from "./database";
import {
  IProduct,
  IFoodProductRequest,
  ICleaningProductRequest,
} from "./interfaces";

const addNewProduct = (request: Request, response: Response): Response => {
  const date: any = new Date();
  date.setDate(date.getDay() + 365);
  if (request.body.length == 1) {
    if (request.body[0].section == "food") {
      const foodData: IFoodProductRequest = request.body[0];

      console.log(market);
      const newFoodData: IProduct = {
        id: market.length + 1,
        ...foodData,
        expirationDate: date,
      };

      market.push(newFoodData);

      return response.status(201).json({
        total: market.length,
        marketProducts: newFoodData,
      });
    } else if (request.body[0].section === "cleaning") {
      const cleaningData: ICleaningProductRequest = request.body[0];

      const newCleaningData: IProduct = {
        id: market.length + 1,
        ...cleaningData,
        expirationDate: date,
      };

      market.push(newCleaningData);

      return response.status(201).json({
        total: market.length,
        marketProducts: newCleaningData,
      });
    }
    null;
  } else {
    const addToList = request.body.map(
      (product: IFoodProductRequest | ICleaningProductRequest) => {
        const findIndex = market.findIndex(
          (productMarket: IProduct) => productMarket.name == product.name
        );

        if (findIndex == -1) {
          const newData = {
            id: market.length + 1,
            ...product,
            expirationDate: date,
          };
          market.push(newData);
          return newData;
        }
      }
    );
    const filterProductsToList = addToList.filter(
      (product: IProduct) => product !== undefined
    );
    return response
      .status(201)
      .json({ total: market.length, marketProducts: filterProductsToList });
  }
  return response.json();
};

const listAllProduct = (request: Request, response: Response): Response => {
  return response.status(200).json({
    total: market.length,
    marketProducts: market,
  });
};

const getProductById = (request: Request, response: Response): Response => {
  const index = response.locals.products.indexProduct;
  return response.status(200).json(market[index]);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const index = response.locals.products.indexProduct;
  market.splice(index, 1);
  return response.status(204).send();
};

const patchProduct = (request: Request, response: Response): Response => {
  const id = response.locals.products.idProduct;
  const index = response.locals.products.indexProduct;
  const findProduct: IProduct | undefined = market.find(
    (product) => product.id == id
  );

  if (request.body.id || request.body.expirationDate || request.body.section) {
    return response.status(409).json({
      error: "Can`t change this",
    });
  }else if(request.body.name == market[index + 1].name){
    return response.status(409).json({
      error: "Product already named"
    });
  }
  const newProduct: IProduct = {
    id: findProduct?.id,
    ...request.body,
    section: findProduct?.section,
    expirationDate: findProduct?.expirationDate,
  };

  market.splice(index, 1, newProduct);
  return response.status(200).json(newProduct);
};

export {
  addNewProduct,
  listAllProduct,
  getProductById,
  deleteProduct,
  patchProduct,
};
