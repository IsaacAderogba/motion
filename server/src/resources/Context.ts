import { UserController, UserFlaskAPI } from "./user/UserDatasource";
import { ReviewController, ReviewFlaskAPI } from "./review/ReviewDatasource";
import { IAuthorizedUser } from "./user/UserModel";
import { MovieFlaskAPI } from "./movie/MovieDatasource";
import { Maybe } from "./types";
import { GenreFlaskAPI } from './genre/GenreDatasource';

export interface Context {
  dataSources: {
    UserController: UserController;
    UserFlaskAPI: UserFlaskAPI;
    ReviewController: ReviewController;
    ReviewFlaskAPI: ReviewFlaskAPI;
    MovieFlaskAPI: MovieFlaskAPI;
    GenreFlaskAPI: GenreFlaskAPI;
  };

  user: Maybe<IAuthorizedUser>;
}
