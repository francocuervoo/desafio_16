export const productsView = (req, res) => {
  res.sendFile("datos.html", { root: "./public" });
};

export const loginView = (req, res) => {
  if (req.user) {
    res.redirect("/products");
  } else {
    res.sendFile("login.html", { root: "./public" });
  }
};

export const logoutView = (req, res) => {
  res.sendFile("logout.html", { root: "./public" });
};

export const failedLogin = (req, res) => {
  res.sendFile("login-error.html", { root: "./public" });
};