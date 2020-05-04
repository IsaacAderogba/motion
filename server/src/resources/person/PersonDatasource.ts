// libs
import { RESTDataSource } from "apollo-datasource-rest";

// helpers
import { INeo4jPerson } from "./PersonModel";

export class PersonFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async readPerson(person: Partial<INeo4jPerson>) {
    return this.get<INeo4jPerson>(`/person/${person.id}`, person);
  }
}
