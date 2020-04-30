// libs
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SQLDataSource } from "datasource-sql";
import { RESTDataSource } from "apollo-datasource-rest";
import Objection from "objection";

// helpers
import UserModel, {
  IUserModel,
  IUserPayload,
  IAuthorizedUser,
  INeo4jUser,
} from "./UserModel";
import { Maybe } from "../types";
import { generateAuthUser } from "./userUtils";
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

  async loginUser(loginDetails: Pick<IUserModel, "email" | "password">) {
    const foundUser = await UserModel.query()
      .findOne(loginDetails)
      .throwIfNotFound();

    if (await bcrypt.compare(loginDetails.password, foundUser.password)) {
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

  async updateUser(user: Partial<IUserModel>, where: Partial<IUserModel>) {}

  async deleteUser(where: Partial<IUserModel>) {}
}

// saves us having to initialise it everywhere we use it
export const UserController = new _UserController();

// UserAPI for interacting with our Neo4j server

class _UserFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async postUser(user: Pick<IUserModel, "id" | "firstName" | "lastName">) {
    const savedUser = await this.post<INeo4jUser>(`/user/${user.id}`, {
      user_id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
    });
    return savedUser;
  }
}

export const UserFlaskAPI = new _UserFlaskAPI();
