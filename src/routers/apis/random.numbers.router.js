import { Router } from "express";

import { randomNumbers } from "../../controllers/api.controllers.js";

const userRouter = Router();

userRouter.get("/", randomNumbers);

export default userRouter;