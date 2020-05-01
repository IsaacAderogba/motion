// libraries
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";

// helpers
import { IUserModel, IAuthUser, IUserPayload } from "./UserModel";

export const userQueryKeys = {
  user: "user",
};

export const userMutationKeys = {
  loginUser: "loginUser",
  registerUser: "registerUser",
  updateUser: "updateUser",
  deleteUser: "deleteUser",
};

export const userErrors = {
  UserAlreadyExists: new UserInputError("User already exists"),
  UserNotFound: new UserInputError("User not found"),
  EmailPasswordWrong: new UserInputError(
    "Incorrect email/password combination"
  ),
};

export const generateJwtToken = ({ id, firstName, lastName }: IUserPayload) => {
  const payload = {
    id,
    firstName,
    lastName,
  };

  const options = {
    expiresIn: "14d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "secret", options);
};

export const generateAuthUser = (user: IUserModel): IAuthUser => {
  return {
    id: user.id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    avatarURL: user.avatarURL,
    isVerified: user.isVerified,
    token: generateJwtToken(user),
  };
};

