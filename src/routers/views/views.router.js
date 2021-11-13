import {
  authMiddleware,
  logoutMiddleware,
  cacheControl,
} from "../../middlewares/auth.middlewares.js";

import {
  productsView,
  loginView,
  logoutView,
  failedLogin,
  processInfoView,
} from "../../controllers/views.controllers.js";

import { Router } from "express";
import compression from "compression";
import passport from "../../utils/passport.util.js";

const viewsRouter = Router();

viewsRouter
  .get("/login", loginView)
  .get("/products", cacheControl, authMiddleware, productsView)
  .get("/info", compression(), processInfoView)
  .get("/logout", logoutMiddleware, logoutView)
  .get("/auth/facebook", passport.authenticate("facebook"))
  .get("/failedLogin", failedLogin)
  .get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/failLogin",
    })
  );

export default viewsRouter;
