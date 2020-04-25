import Knex from "knex";
import config from "./knexfile";

type DB_ENV = "production" | "staging" | "development" | "test";
const environment: DB_ENV = (process.env.DB_ENV as DB_ENV) || "development";

export const knexConfig = config[environment];
export const knex = Knex(knexConfig);
