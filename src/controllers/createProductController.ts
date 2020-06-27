import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = new Product({
    name: "Fixtures",
    price: "100",
    oldPrice: "200",
    isDiscount: true,
  });

  try {
    const result = await newProduct.save();
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

export default createProductController;
