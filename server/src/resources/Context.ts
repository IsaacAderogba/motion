import { UserController, UserFlaskAPI } from "./user/UserDatasource";
import { ReviewController, ReviewFlaskAPI } from "./review/ReviewDatasource";
import { IAuthorizedUser } from "./user/UserModel";
import { MovieFlaskAPI } from "./movie/MovieDatasource";
import { Maybe } from "./types";
import { GenreFlaskAPI } from './genre/GenreDatasource';
import { PersonFlaskAPI } from './person/PersonDatasource';

export interface Context {
  dataSources: {
    UserController: UserController;
    UserFlaskAPI: UserFlaskAPI;
    ReviewController: ReviewController;
    ReviewFlaskAPI: ReviewFlaskAPI;
    MovieFlaskAPI: MovieFlaskAPI;
    GenreFlaskAPI: GenreFlaskAPI;
    PersonFlaskAPI: PersonFlaskAPI;
  };

  user: Maybe<IAuthorizedUser>;
}
