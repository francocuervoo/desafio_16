import parseArgs from "minimist";
import { argv } from "process";

const options = {
  // Con alias abrevio port como -p y modo como -m
  // No hay que usarlo para PM2 ya que son palabras reservadas
  alias: {
    p: "port",
    m: "modo",
  },
  //Si no se le pasa ningún parámetro el port es 9090
  default: {
    port: 9090,
    modo: "fork",
  },
};

export const { port, modo } = parseArgs(argv, options);
