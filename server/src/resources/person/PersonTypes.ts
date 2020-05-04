import { objectType, inputObjectType } from "@nexus/schema";
import { Movie } from "../movie/MovieTypes";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.id("id", { nullable: false });
    t.string("name", { nullable: false });
    t.list.field("acted_in", { type: Movie, nullable: false });
    t.list.field("directed", { type: Movie, nullable: false });
    t.list.field("wrote", { type: Movie, nullable: false });
  },
});

export const PersonWhere = inputObjectType({
  name: "PersonWhere",
  definition(t) {
    t.id("id", { required: true });
  },
});
