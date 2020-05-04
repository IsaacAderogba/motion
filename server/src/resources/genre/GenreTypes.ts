import { objectType, inputObjectType } from "@nexus/schema";
import { Movie } from "../movie/MovieTypes";

export const Genre = objectType({
  name: "Genre",
  definition(t) {
    t.id("id", { nullable: false });
    t.string("name", { nullable: false });
    t.list.field("movies", {
      type: Movie,
      nullable: false,
    });
  },
});

export const GenreWhere = inputObjectType({
  name: "GenreWhere",
  definition(t) {
    t.id("id", { required: true });
  },
});
