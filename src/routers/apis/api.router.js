import { Router } from "express";

import userRouter from "./user.router.js";
import productsRouter from "./products.router.js";
import processInfoRouter from "./process.info.router.js";
import randomNumbersRouter from "./random.numbers.router.js";

const apiRouter = Router();

apiRouter
  .use("/user", userRouter)
  .use("/products", productsRouter)
  .use("/info", processInfoRouter)
  .use("/randoms", randomNumbersRouter);

export default apiRouter;
