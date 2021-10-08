export const auth = (req, res, next) => {
  if (req.session.nombre) {
    next();
  } else {
    res.direct("/login");
  }
};
