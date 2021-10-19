import { authMiddleware, logoutMiddleware, cacheControl } from '../../middlewares/auth.middlewares.js'

import { productsView, loginView, logoutView, failedLogin } from '../../controllers/views.controllers.js';

import { Router } from 'express';

import passport from "../../utils/passport.util.js";

const viewsRouter = Router();

viewsRouter
  .get('/login', loginView)
  .get('/products', cacheControl, authMiddleware, productsView)
  .get('/logout', logoutMiddleware, logoutView)
  .get("/auth/facebook", passport.authenticate("facebook"))
  .get("/failedLogin", failedLogin)
  .get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/failLogin",
    })
  );
  
export default viewsRouter



























/* viewsRouter.get('/', (req, res) => {
  res.redirect('/login')
}); */



/* viewsRouter.get('/login', (req, res) => {

  if (req.session.nombre) {

    res.redirect('/products')
    
  } else {

    res.sendFile('login.html', { root: './public' }) 
  }
}); */




/* 
viewsRouter.post('/login', (req, res) => {

  console.log(req.body)

  req.session.nombre = req.body.nombre;

  res.redirect('/products')
}); */




