// libs
import { extendType, arg } from "@nexus/schema";
import { MovieWhere, Movie } from "./MovieTypes";

export const MovieQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("movie", {
      type: Movie,
      nullable: true,
      args: {
        movieWhere: arg({ type: MovieWhere, required: true }),
      },
      resolve: async (
        parent,
        { movieWhere },
        { dataSources: { MovieFlaskAPI, UserController } }
      ) => {
        const movie = await MovieFlaskAPI.readMovie(movieWhere);
        const userIds = movie.favourites.map((favourite) => favourite.id);
        const favourites = await UserController.readUserList(userIds);
        return { ...movie, favourites };
      },
    });
  },
});
