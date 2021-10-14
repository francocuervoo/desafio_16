export const authMiddleware = (req, res, next) => {
  if (req.session.nombre) {
    next();
  } else {
    res.redirect("/login");
  }
};

export const loginMiddleware = (req, res, next) => {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre;

    // Si en el login usan Axios del lado del cliente
    // el redireccionamiento debe ser hecho del lado del cliente
    // según la respuesta que reciba del servidor => login: 'ok'

    res.send({ login: "ok" });

    // Si en el login usan HTML (action="/login" method="post")
    // el redireccionamiento debe ser hecho del lado del servidor:

    // res.redirect('/products')
  } else {
    res.send({ login: "failed" });

    // Si en el login usan HTML, si el login falla volver a /login:
    // res.redirect('/login)
  }
};

export const logoutMiddleware = (req, res, next) => {

  if (req.session.nombre) {

    req.session.destroy((err) => {

    if (!err) {
        
      next();

    } else {

      res.status(400).send(err)
    }
  })

  } else {

    res.redirect('/login')
  }
}

export const cacheControl = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
};
