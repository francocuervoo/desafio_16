import log4js from "log4js";

log4js.configure({
  appenders: {
    consola: { type: "console" },
    archivoErrores: { type: "file", filename: "logs-errors.log" },
    archivoWarning: { type: "file", filename: "logs-warning.log" },
    loggerConsole: {
      type: "logLevelFilter",
      appender: "consola",
      level: "info",
    },
    loggerWarning: {
      type: "logLevelFilter",
      appender: "archivoErrores",
      level: "error",
    },
    loggerArchivoErrores: {
      type: "logLevelFilter",
      appender: "archivoErrores",
      level: "error",
    },
    loggerArchivoWarning: {
      type: "logLevelFilter",
      appender: "archivoWarning",
      level: "warning",
    },
  },
  categories: {
    default: { appenders: ["loggerConsole"], level: "all" },
    prod: {
      appenders: ["loggerArchivoErrores", "loggerArchivoWarning"],
      level: "all",
    },
  },
});

let logger = log4js.getLogger();

export default logger;
