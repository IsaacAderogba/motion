import { Model } from "objection";

export interface IUserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarURL?: string;
  avatarID?: string;
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

export interface IUserPayload {
  id: number;
  firstName: string;
  lastName: string;
}

class UserModel extends Model implements IUserModel {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  avatarURL?: string;
  avatarID?: string;
  isVerified!: boolean;

  static get tableName() {
    return "Users";
  }

  // create schema
}

export default UserModel;
