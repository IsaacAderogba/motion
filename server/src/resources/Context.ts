import { UserController, UserFlaskAPI } from "./user/UserDatasource";
import { ReviewController, ReviewFlaskAPI } from "./review/ReviewDatasource";
import { IAuthorizedUser } from "./user/UserModel";
import { MovieFlaskAPI } from './movie/MovieDatasource';
import { Maybe } from "./types";

export interface Context {
  dataSources: {
    UserController: typeof UserController;
    UserFlaskAPI: typeof UserFlaskAPI;
    ReviewController: typeof ReviewController;
    ReviewFlaskAPI: typeof ReviewFlaskAPI;
    MovieFlaskAPI: typeof MovieFlaskAPI;
  };

  user: Maybe<IAuthorizedUser>;
}
