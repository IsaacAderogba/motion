import { objectType } from "@nexus/schema";

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
    // movie also has directors, writers, actors, favourites, reviews, genre
  },
});
