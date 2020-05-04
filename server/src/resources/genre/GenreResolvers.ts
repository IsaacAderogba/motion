// libs
import { extendType, arg } from "@nexus/schema";
import { Genre, GenreWhere } from "./GenreTypes";

export const GenreQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("genre", {
      type: Genre,
      nullable: true,
      args: {
        genreWhere: arg({ type: GenreWhere, required: true }),
      },
      resolve: async (
        parent,
        { genreWhere },
        { dataSources: { GenreFlaskAPI } }
      ) => {
        return await GenreFlaskAPI.readGenre(genreWhere);
      },
    });
  },
});
