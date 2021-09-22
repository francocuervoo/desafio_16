import { config } from "./config.js";
import knex from "knex";

export const dbMaria = knex(config);


