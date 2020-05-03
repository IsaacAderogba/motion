// libs
import { RESTDataSource } from "apollo-datasource-rest";

// helpers
import { INeo4jMovie } from "./MovieModel";

class _MovieFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async readMovie(movie: Partial<INeo4jMovie>) {
    const fetchedMovie = await this.get<INeo4jMovie>(
      `/movie/${movie.id}`,
      movie
    );

    return fetchedMovie;
  }
}

export const MovieFlaskAPI = new _MovieFlaskAPI();
