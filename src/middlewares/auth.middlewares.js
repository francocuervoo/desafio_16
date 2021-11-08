export const authMiddleware = (req, res, next) => {
  next()
  /*if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }*/
};

export const logoutMiddleware = (req, res, next) => {
  req.logout();
  next();
};

export const cacheControl = (req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
};
