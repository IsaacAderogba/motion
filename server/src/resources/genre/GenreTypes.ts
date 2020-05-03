import { objectType } from '@nexus/schema';

export const Genre = objectType({
  name: "Genre",
  definition(t) {
    t.id("id", { nullable: false })
    t.string("name", { nullable: false })
    // also has movies
  }
})