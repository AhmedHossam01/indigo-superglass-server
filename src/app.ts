// ANCHOR: Imports
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import throwErr from "./utils/errHandler";
import rootRouter from "./api/rootRouter";
import runDB from "./runDB";

// ANCHOR: Constants
const { PORT } = process.env;

// ANCHOR: Initializations
runDB();
const app: Application = express();

app.listen(PORT || 5050, () => console.log("SERVER OK: " + PORT));

// ANCHOR: Public Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ANCHOR: API Links
app.use("/api", rootRouter);

// ANCHOR: Error Handling
app.all("*", (req, res, next) => {
  throwErr(404, "Route not found", next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message = "something went wrong" } = err;

  res.status(statusCode).json({
    error: {
      statusCode,
      message,
    },
  });
});
