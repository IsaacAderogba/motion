import { UserController, UserFlaskAPI } from "./user/UserDatasource";
import { IAuthorizedUser } from "./user/UserModel";
import { Maybe } from "./types";

export interface Context {
  dataSources: {
    UserController: typeof UserController;
    UserFlaskAPI: typeof UserFlaskAPI;
  };

  user: Maybe<IAuthorizedUser>;
}
