// libraries
import jwt from "jsonwebtoken";

// helpers
import { IUserModel, IAuthUser, IUserPayload } from "./userModel";

export const userQueryKeys = {};

export const userMutationKeys = {};

export const userErrors = {};

export const generateJwtToken = ({
  id,
  firstName,
  lastName,
}: IUserPayload) => {
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
