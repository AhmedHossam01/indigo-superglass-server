import { Router, Request, Response, NextFunction } from "express";
import throwErr from "../utils/errHandler";
import productsRouter from "./productsRouter";

const router = Router();

// ANCHOR: Route Handling
router.use("/products", productsRouter);

// ANCHOR: 404 Error Handling
router.all("*", (req: Request, res: Response, next: NextFunction) => {
  throwErr(404, "Route not found", next);
});

export default router;
