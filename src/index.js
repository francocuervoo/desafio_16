import cluster from "cluster";
import { cpus } from "os";

import app from "./server.js";

import { modo, port } from "./utils/minimist.util.js";

if (modo == "cluster" && cluster.isMaster) {
  const numCPUs = cpus().length;
  console.log(`Numero de procesadores: ${numCPUs}`);
  console.log(`PID Master process: ${process.pid}`);

  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
    console.log(`CPU: ${i}`);
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  console.log("Modo", modo);
  process.on("exit", (code) => {
    console.log("Salida con código de error: ", code);
  });

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
}
