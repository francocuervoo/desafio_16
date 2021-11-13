import cluster from "cluster";
import { cpus } from "os";

import app from "./server.js";

import { modo, port } from "./utils/minimist.util.js";

import logger from "./logger.js";

if (modo == "cluster" && cluster.isMaster) {
  logger.info("Modo Cluster");
  const numCPUs = cpus().length;
  logger.info(`Numero de procesadores: ${numCPUs}`);
  logger.info(`PID Master process: ${process.pid}`);

  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
    logger.info(`CPU: ${i}`);
  }

  cluster.on("exit", (worker) => {
    logger.info(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  logger.info("Modo", modo);
  process.on("exit", (code) => {
    logger.error("Salida con código de error: ", code);
  });

  app.listen(port, () => {
    logger.info(`Server running on: http://localhost:${port}`);
  });
}
