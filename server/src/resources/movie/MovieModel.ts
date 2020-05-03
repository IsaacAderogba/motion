import { INeo4jPerson } from '../person/PersonModel';
import { INeo4jUser } from '../user/UserModel';
import { INeo4jReview } from '../review/ReviewModel';
import { INeo4jGenre } from '../genre/GenreModel';

export interface INeo4jMovie {
  id: string;
  title: string;
  year: number;
  duration: string;
  summary: string;
  rating: number;
  movieUrl: string;
  directors: INeo4jPerson[];
  writers: INeo4jPerson[];
  actors: INeo4jPerson[];
  favourites: INeo4jUser[];
  reviews: INeo4jReview[];
  in_genre: INeo4jGenre[];
}
