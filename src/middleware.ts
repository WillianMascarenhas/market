import { NextFunction, request, Request, Response } from "express";
import market from "./database";

const productByName = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name }: any = request.query;

  if (name) {
    const findIndex = market.findIndex(
      (product) => product.name.toLocaleLowerCase() == name.toLocaleLowerCase()
    );

    if (findIndex !== -1) {
      const filterByName = market.filter(
        (product) =>
          product.name.toLocaleLowerCase() == name.toLocaleLowerCase()
      );

      return response.status(200).json({
        total: market.length,
        marketProducts: filterByName,
      });
    }
    return response.status(404).json({
      error: "Product not found"
    });
  }

  return next();
};


const ProductExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = parseInt(request.params.id);
  const findIndex = market.findIndex((product) => product.id === id);

  response.locals.products = {
    idProduct: id,
    indexProduct: findIndex,
  };

  if (findIndex === -1) {
    return response.status(404).json({
      error: "Product not found"
    });
  }

  return next();
};

const requestExist = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const verifyNamePrduct = market.findIndex(
    (product) => product.name == request.body[0].name
  );

  if (verifyNamePrduct !== -1) {
    return response.status(409).json({
      error: "Product already registered"
    });
  }
  return next();
};

export { productByName, ProductExist, requestExist };
