import { UserController } from "./user/UserDatasource";
import { knex } from "../db/knexConfig";

export class Context {
  userController = new UserController(knex);
}
