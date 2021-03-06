import { Model } from "objection";
import { INeo4jMovie } from "../movie/MovieModel";
import { INeo4jReview } from "../review/ReviewModel";

export interface IAuthorizedUser {
  id: IUserModel["id"];
}
export interface IUserModel<Id = number> {
  id: Id;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarURL?: string;
  avatarId?: string;
  isVerified: boolean;
}

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarURL: string | undefined;
  isVerified: boolean;
  token: string;
}

export interface INeo4jUser {
  id: number;
  firstName: string;
  lastName: string;
  favourited: INeo4jMovie[];
  wrote_review: INeo4jReview[];
}

export interface IUserPayload {
  id: number;
  firstName: string;
  lastName: string;
}

export class UserModel extends Model implements IUserModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  avatarURL?: string;
  avatarId?: string;
  isVerified!: boolean;

  $toData(): IUserModel {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      avatarURL: this.avatarURL,
      avatarId: this.avatarId,
      isVerified: this.isVerified,
    };
  }

  static get tableName() {
    return "Users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstName", "lastName", "email", "password"],
      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        avatarURL: { type: "string", minLength: 1, maxLength: 510 },
        avatarId: { type: "string", minLength: 1, maxLength: 255 },
        isVerified: { type: "boolean" },
      },
    };
  }
}
