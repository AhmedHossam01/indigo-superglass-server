import { Router } from "express";
import createProductController from "../controllers/createProductController";
import getProductsController from "../controllers/getProductsController";

// NOTE: route => /api/products

const router = Router();

// ANCHOR: Controllers
router.route("/").post(createProductController).get(getProductsController);

export default router;
