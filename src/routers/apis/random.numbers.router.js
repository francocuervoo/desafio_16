import { Router } from "express";

import { randomNumber } from "../../controllers/api.controllers.js";

const userRouter = Router();

userRouter.get("/", randomNumber);

export default userRouter;