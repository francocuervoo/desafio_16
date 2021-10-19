import { fakerData } from "../utils/faker.util.js";

export const productsController = (req, res) => {
  const products = fakerData(1, 5);

  res.status(200).send(products);
};

export const userController = (req, res) => {
  res.send({
    nombre: req.user,
  });
};
