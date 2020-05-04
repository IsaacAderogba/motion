// libs
import { extendType, arg } from "@nexus/schema";
import { Person, PersonWhere } from './PersonTypes';

export const PersonQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("person", {
      type: Person,
      nullable: true,
      args: {
        personWhere: arg({ type: PersonWhere, required: true })
      },
      resolve: async (parent, { personWhere }, { dataSources: { PersonFlaskAPI }}) => {
        return PersonFlaskAPI.readPerson(personWhere);
      }
    })
  }
})