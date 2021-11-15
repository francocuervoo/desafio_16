import cluster from "cluster";
import { cpus } from "os";

import app from "./server.js";

import { modo, port } from "./utils/minimist.util.js";

import { logInfo, logError } from "./utils/logger.util.js";

if (modo == "cluster" && cluster.isMaster) {
  logInfo("Modo Cluster");
  const numCPUs = cpus().length;
  logInfo(`Numero de procesadores: ${numCPUs}`);
  logInfo(`PID Master process: ${process.pid}`);

  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
    logInfo(`CPU: ${i}`);
  }

  cluster.on("exit", (worker) => {
    logInfo(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  logInfo("Modo", modo);
  process.on("exit", (code) => {
    logError("Salida con código de error: ", code);
  });

  app.listen(port, () => {
    let msg = `Server running on: http://localhost:${port}`;
    process.env.NODE_ENV == 'development' ? console.log(msg) : logInfo(msg);
  });

}
