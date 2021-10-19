import { fakerData } from "../utils/faker.util.js";

export const productsController = (req, res) => {
  const products = fakerData(1, 5);
  res.status(200).send(products);
};

export const userFacebook = (req, res) => {
  const nombreCompleto = req.user.displayName;
  const arrayDeNombres = nombreCompleto.split(" ");
  const nombreDePila = arrayDeNombres[0];
  res.send({
    user: {
      nombre: nombreDePila,
      photo: req.user.photos[0].value,
      email: req.user.emails[0].value,
    },
  });
};

