import { objectType, inputObjectType } from "@nexus/schema";
import { Person } from "../person/PersonTypes";
import { User } from "../user/UserTypes";
import { Review } from "../review/ReviewTypes";
import { Genre } from "../genre/GenreTypes";

export const Movie = objectType({
  name: "Movie",
  definition(t) {
    t.id("id", { nullable: false });
    t.string("title", { nullable: false });
    t.int("year", { nullable: false });
    t.string("duration", { nullable: false });
    t.string("summary", { nullable: false });
    t.float("rating", { nullable: false });
    t.string("movieUrl", { nullable: false });
    t.list.field("directors", { type: Person, nullable: false });
    t.list.field("writers", { type: Person, nullable: false });
    t.list.field("actors", { type: Person, nullable: false });
    t.list.field("favourites", { type: User, nullable: false });
    t.list.field("reviews", { type: Review, nullable: false });
    t.list.field("in_genre", { type: Genre, nullable: false });
  },
});

export const MovieWhere = inputObjectType({
  name: "MovieWhere",
  definition(t) {
    t.id("id", { required: true });
  },
});
