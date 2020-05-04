// libs
import { RESTDataSource } from "apollo-datasource-rest";

// helpers
import { INeo4jGenre } from "./GenreModel";

export class GenreFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async readGenre(genre: Partial<INeo4jGenre>) {
    return this.get<INeo4jGenre>(`/genre/${genre.id}`, genre);
  }
}
