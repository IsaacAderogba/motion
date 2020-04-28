// libraries
import { SQLDataSource } from "datasource-sql";
import { RESTDataSource } from "apollo-datasource-rest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// helpers
import UserModel, { IUserModel, IUserPayload } from "./userModel";
import { generateAuthUser } from "./userUtils";
import { Maybe } from "../utils";

export class UserController extends SQLDataSource {
  async registerUser(
    user: Pick<IUserModel, "firstName" | "lastName" | "email" | "password">
  ) {
    const password = await bcrypt.hash(user.password, 12);

    const insertedUser = await UserModel.query().insertAndFetch({
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

  async authenticateUser(
    token: string
  ): Promise<Maybe<{ id: IUserModel["id"] }>> {
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

  async readUser(where: Partial<IUserModel>) {}

  async updateUser(user: Partial<IUserModel>, where: Partial<IUserModel>) {}

  async deleteUser(where: Partial<IUserModel>) {}
}

export class UserAPI extends RESTDataSource {}
