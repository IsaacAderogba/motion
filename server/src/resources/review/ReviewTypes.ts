import { objectType, inputObjectType } from "@nexus/schema";
import { User, Neo4jUser } from "../user/UserTypes";
import { Movie } from "../movie/MovieTypes";

export const ReviewInput = inputObjectType({
  name: "ReviewInput",
  definition(t) {
    t.string("movieId", { required: true });
    t.string("title", { required: false });
    t.string("description", { required: false });
    t.float("rating", { required: true });
  },
});

export const ReviewWhere = inputObjectType({
  name: "ReviewWhere",
  definition(t) {
    t.id("id", { required: true });
    t.int("userId", { required: false });
    t.string("movieId", { required: false });
    t.float("rating", { required: false });
  },
});

export const Review = objectType({
  name: "Review",
  definition(t) {
    t.int("id");
    t.int("userId", { nullable: false });
    t.string("movieId", { nullable: false });
    t.string("title", { nullable: true });
    t.string("description", { nullable: true });
    t.float("rating", { nullable: false });
    t.string("createdAt", { nullable: false });
    t.string("updatedAt", { nullable: false });
    t.list.field("user", {
      type: Neo4jUser,
      nullable: true,
    });
    t.list.field("reviewed_movie", {
      type: Movie,
      nullable: true,
    });
  },
});
