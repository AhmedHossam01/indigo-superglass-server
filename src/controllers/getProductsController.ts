import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * OLD DESIGN
   * The job of this messy code is to divide req.query into other objects like filter, sort
   * and apply some logic to convert each string into it's meant value (boolean or number)
   * to add a new object, simply create it with object name and this add it to the loop
   */

  //   const filter: any = { objectName: "filter" };
  //   const sort: any = { objectName: "sort" };

  //   const optionOpjects = [filter, sort];

  //   for (let i = 0; i < optionOpjects.length; i++) {
  //     const currentObject = optionOpjects[i];

  //     for (const key in req.query[currentObject.objectName]) {
  //       if (
  //         req.query[currentObject.objectName][key] === "false" ||
  //         req.query[currentObject.objectName][key] === "true"
  //       ) {
  //         currentObject[key] =
  //           req.query[currentObject.objectName][key] === "true";
  //       } else if (!isNaN(+req.query[currentObject.objectName][key])) {
  //         currentObject[key] = +req.query[currentObject.objectName][key];
  //       } else {
  //         currentObject[key] = req.query[currentObject.objectName][key];
  //       }

  //       delete currentObject.objectName;
  //     }
  //   }

  //   "older" design
  //   for (const key in exact) {
  //     if (exact[key] === "false" || exact[key] === "true") {
  //       filter[key] = exact[key] === "true";
  //     } else if (!isNaN(+exact[key])) {
  //       filter[key] = +exact[key];
  //     } else {
  //       filter[key] = exact[key];
  //     }
  //   }

  // Now we're using json :)
  /**
   *  we expect a req.query contains string called query which contains json object that contains:
   * ++ filter
   * +++ key = value
   * ++ sort
   * +++ key = value
   * ++ limit
   */

  const query = req.query.query ? JSON.parse(req.query.query) : {};

  try {
    const products = await Product.find(query.filter)
      .sort(query.sort)
      .limit(query.limit);

    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

export default getProductsController;
