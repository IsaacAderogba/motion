import { INeo4jMovie } from '../movie/MovieModel';

export interface INeo4jPerson {
  id: string;
  name: string;
  acted_in: INeo4jMovie[];
  directed: INeo4jMovie[];
  wrote: INeo4jMovie[];
}