import { fakerData } from "../utils/faker.util.js";
import { sessionData } from "../utils/process.info.util.js";
import { fork } from "child_process";


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

export const infoProcess = (req, res) => {
  res.send(sessionData());
};

export const randomNumber = (req, res) => {
  const numero = +req.query.cantidad ? +req.query.cantidad : 100000000;
  const randomsFork = fork("./src/utils/procesoHijo.js");
  randomsFork.on("message", (respuestaChild) => {
    if (respuestaChild == "ready") {
      randomsFork.send(numero);
    } else {
      const resultadoJson = JSON.stringify(respuestaChild);
      res.status(200).end(resultadoJson);
    }
  });
};
