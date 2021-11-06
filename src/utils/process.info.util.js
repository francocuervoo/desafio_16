import {argv, platform, version, memoryUsage, execPath, cwd, pid } from "process"; 
import { cpus } from "os";

const cliArgs = argv.slice(2).join(" ").toString();
const numCPUs = cpus().length;

export const sessionData = () => {
  const data = {
    commandLineArgs: cliArgs,
    sistemaOperativo: platform,
    nodeVersion: version,
    CPUs: numCPUs,
    memoriaRSS: memoryUsage().rss,
    nodePath: execPath,
    projectPath: cwd(),
    processId: pid

  };
  return data;
};
