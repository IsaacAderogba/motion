import { Model } from "objection";

class User extends Model {
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
}

export default User;
