export const auth = (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.direct("/login");
  }
};
