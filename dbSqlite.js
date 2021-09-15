import { config } from "./configSqlite.js";
import knex from "knex";

export const db = knex(config);


