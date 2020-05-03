import { objectType } from "@nexus/schema";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.id("id", { nullable: false });
    t.string("name", { nullable: false });
    // person also has acted_in, directed, wrote
  }
})