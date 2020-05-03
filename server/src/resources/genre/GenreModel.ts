import { INeo4jMovie } from "../movie/MovieModel";

export interface INeo4jGenre {
  id: string;
  name: string;
  movies: INeo4jMovie[];
}
