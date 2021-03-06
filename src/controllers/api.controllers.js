import { fakerData } from "../utils/faker.util.js";
import { sessionData } from "../utils/process.info.util.js";
//import { fork } from "child_process";
import { logInfo, logError } from "../utils/logger.util.js";
import { listaRandoms } from "../utils/randoms.util.js";

const dev = process.env.NODE_ENV == "development";

export const randomsController = (req, res) => {
  try {
    const cantidad = +req.query.cantidad || 1e8;
    const info = `Cantidad: ${cantidad}`;
    dev ? console.log(info) : logInfo(info);
    const resultado = listaRandoms(cantidad);
    // Testear el rendimiento con y sin este console.log:
    dev && console.log(resultado);
    res.send({resultado})
  } catch (error) { 
    dev ? console.log(error) : logError(error);
  }  
}


export const randomNumbers = (req, res) => {
  try {
    const cantidad = +req.query.cantidad || 1e8;
    const info = `Cantidad: ${cantidad}`;
    dev ? console.log(info) : logInfo(info);
    const resultado = listaRandoms(cantidad);
    // Testear el rendimiento con y sin este console.log:
    dev && console.log(resultado);
    res.send({ resultado });
  } catch (error) {
    dev ? console.log(error) : logError(error);
  }
};

export const productsController = (req, res) => {
  try {
    const products = fakerData(1,5);
    // Probar el logger de errores con un error intencional:
    //consoul.log('Error intencional'); // ReferenceError: consoul is not defined
    res.status(200).send(products)
  } catch (error) { 
    dev ? console.log(error) : logError(error) 
  }   
};

export const userFacebook = (req, res) => {
  try {
    const nombreCompleto = req.user.displayName;
    const arrayDeNombres = nombreCompleto.split(" ");
    const nombreDePila = arrayDeNombres[0];

    logInfo(req.user);

    res.send({
      user: {
        nombre: nombreDePila,
        photo: req.user.photos[0].value,
        email: req.user.emails[0].value,
      },
    });
  } catch (error) {
    console.log(error);
    logError(error);
  }
};

export const infoProcess = (req, res) => {
  dev && console.log(sessionData());  
  res.send(sessionData());
};
