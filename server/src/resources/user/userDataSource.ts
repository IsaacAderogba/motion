// libs
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SQLDataSource } from "datasource-sql";
import { RESTDataSource } from "apollo-datasource-rest";
import Objection from "objection";

// helpers
import {
  UserModel,
  IUserModel,
  IUserPayload,
  IAuthorizedUser,
  INeo4jUser,
} from "./UserModel";
import { Maybe } from "../types";
import { generateAuthUser } from "./UserUtils";
import { knexConfig } from "../../db/knexConfig";

class _UserController extends SQLDataSource {
  model = UserModel;

  constructor() {
    super(knexConfig);
  }

  async registerUser(
    user: Pick<IUserModel, "firstName" | "lastName" | "email" | "password">,
    trx: Objection.Transaction
  ) {
    const password = await bcrypt.hash(user.password, 12);

    const insertedUser = await UserModel.query(trx).insertAndFetch({
      ...user,
      password,
    });

    const authUser = generateAuthUser(insertedUser);
    return authUser;
  }

  async loginUser(loginInput: Pick<IUserModel, "email" | "password">) {
    const foundUser = await UserModel.query()
      .findOne({ email: loginInput.email })
      .throwIfNotFound();

    if (await bcrypt.compare(loginInput.password, foundUser.password)) {
      const authUser = generateAuthUser(foundUser);
      return authUser;
    }

    return null;
  }

  async authenticateUser(token: string): Promise<Maybe<IAuthorizedUser>> {
    if (!token) return null;

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    ) as IUserPayload;

    const foundUser = await UserModel.query()
      .findById(decodedToken.id)
      .throwIfNotFound();

    return {
      id: foundUser.id,
    };
  }

  async readUser(where: Partial<IUserModel>) {
    const foundUser = await UserModel.query().findOne(where).throwIfNotFound();
    return foundUser.toData();
  }

  async updateUser(
    user: Partial<IUserModel>,
    where: Partial<IUserModel>,
    trx: Objection.Transaction
  ) {
    const foundUser = await UserModel.query(trx)
      .findOne(where)
      .throwIfNotFound();

    const updatedUser = await foundUser.$query().patchAndFetch(user);
    return updatedUser.toData();
  }

  async deleteUser(where: Pick<IUserModel, "id">, trx: Objection.Transaction) {
    const deletedUser = await UserModel.query(trx)
      .deleteById(where.id)
      .where({ id: where.id })
      .returning("*")
      .first();

    return deletedUser.toData();
  }
}

// UserAPI for interacting with our Neo4j server
class _UserFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async postUser(user: INeo4jUser) {
    const savedUser = await this.post<INeo4jUser>(`/user/${user.id}`, user);
    return savedUser;
  }

  async putUser(user: INeo4jUser) {
    const updatedUser = await this.put<INeo4jUser>(`/user/${user.id}`, user);
    return updatedUser;
  }

  async deleteUser(id: INeo4jUser["id"]) {
    const deletedUser = await this.delete<INeo4jUser>(`/user/${id}`);
    return deletedUser;
  }
}

export const UserController = new _UserController();
export const UserFlaskAPI = new _UserFlaskAPI();
