/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as ctx from "../resources/Context"





declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  GenreWhere: { // input type
    id: string; // ID!
  }
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  MovieWhere: { // input type
    id: string; // ID!
  }
  PersonWhere: { // input type
    id: string; // ID!
  }
  RegisterInput: { // input type
    avatarURL?: string | null; // String
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  ReviewInput: { // input type
    description?: string | null; // String
    movieId: string; // String!
    rating: number; // Float!
    title?: string | null; // String
  }
  ReviewWhere: { // input type
    id: string; // ID!
    movieId?: string | null; // String
    rating?: number | null; // Float
    userId?: number | null; // Int
  }
  UserInput: { // input type
    firstName?: string | null; // String
    isVerified?: boolean | null; // Boolean
    lastName?: string | null; // String
    photoId?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthUser: { // root type
    avatarURL?: string | null; // String
    firstName: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    lastName: string; // String!
    token: string; // String!
  }
  Genre: { // root type
    id: string; // ID!
    movies: NexusGenRootTypes['Movie'][]; // [Movie!]!
    name: string; // String!
  }
  Movie: { // root type
    actors: NexusGenRootTypes['Person'][]; // [Person!]!
    directors: NexusGenRootTypes['Person'][]; // [Person!]!
    duration: string; // String!
    favourites: NexusGenRootTypes['Neo4jUser'][]; // [Neo4jUser!]!
    id: string; // String!
    in_genre: NexusGenRootTypes['Genre'][]; // [Genre!]!
    movieUrl: string; // String!
    rating: number; // Float!
    reviews: NexusGenRootTypes['Review'][]; // [Review!]!
    summary: string; // String!
    title: string; // String!
    writers: NexusGenRootTypes['Person'][]; // [Person!]!
    year: number; // Int!
  }
  Mutation: {};
  Neo4jUser: { // root type
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
  }
  Person: { // root type
    acted_in: NexusGenRootTypes['Movie'][]; // [Movie!]!
    directed: NexusGenRootTypes['Movie'][]; // [Movie!]!
    id: string; // ID!
    name: string; // String!
    wrote: NexusGenRootTypes['Movie'][]; // [Movie!]!
  }
  Query: {};
  Review: { // root type
    createdAt: string; // String!
    description?: string | null; // String
    id: number; // Int!
    movieId: string; // String!
    rating: number; // Float!
    title?: string | null; // String
    updatedAt: string; // String!
    userId: number; // Int!
  }
  User: { // root type
    avatarId?: string | null; // String
    avatarURL?: string | null; // String
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    lastName: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  GenreWhere: NexusGenInputs['GenreWhere'];
  LoginInput: NexusGenInputs['LoginInput'];
  MovieWhere: NexusGenInputs['MovieWhere'];
  PersonWhere: NexusGenInputs['PersonWhere'];
  RegisterInput: NexusGenInputs['RegisterInput'];
  ReviewInput: NexusGenInputs['ReviewInput'];
  ReviewWhere: NexusGenInputs['ReviewWhere'];
  UserInput: NexusGenInputs['UserInput'];
}

export interface NexusGenFieldTypes {
  AuthUser: { // field return type
    avatarURL: string | null; // String
    firstName: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    lastName: string; // String!
    token: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Genre: { // field return type
    id: string; // ID!
    movies: NexusGenRootTypes['Movie'][]; // [Movie!]!
    name: string; // String!
  }
  Movie: { // field return type
    actors: NexusGenRootTypes['Person'][]; // [Person!]!
    directors: NexusGenRootTypes['Person'][]; // [Person!]!
    duration: string; // String!
    favourites: NexusGenRootTypes['Neo4jUser'][]; // [Neo4jUser!]!
    id: string; // String!
    in_genre: NexusGenRootTypes['Genre'][]; // [Genre!]!
    movieUrl: string; // String!
    rating: number; // Float!
    reviews: NexusGenRootTypes['Review'][]; // [Review!]!
    summary: string; // String!
    title: string; // String!
    writers: NexusGenRootTypes['Person'][]; // [Person!]!
    year: number; // Int!
  }
  Mutation: { // field return type
    createReview: NexusGenRootTypes['Review']; // Review!
    deleteReview: NexusGenRootTypes['Review']; // Review!
    deleteUser: NexusGenRootTypes['User']; // User!
    loginUser: NexusGenRootTypes['AuthUser'] | null; // AuthUser
    registerUser: NexusGenRootTypes['AuthUser']; // AuthUser!
    updateReview: NexusGenRootTypes['Review']; // Review!
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Neo4jUser: { // field return type
    favourited: NexusGenRootTypes['Movie'][]; // [Movie!]!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    wrote_review: NexusGenRootTypes['Review'][]; // [Review!]!
  }
  Person: { // field return type
    acted_in: NexusGenRootTypes['Movie'][]; // [Movie!]!
    directed: NexusGenRootTypes['Movie'][]; // [Movie!]!
    id: string; // ID!
    name: string; // String!
    wrote: NexusGenRootTypes['Movie'][]; // [Movie!]!
  }
  Query: { // field return type
    genre: NexusGenRootTypes['Genre'] | null; // Genre
    movie: NexusGenRootTypes['Movie'] | null; // Movie
    person: NexusGenRootTypes['Person'] | null; // Person
    review: NexusGenRootTypes['Review'] | null; // Review
    user: NexusGenRootTypes['User'] | null; // User
  }
  Review: { // field return type
    createdAt: string; // String!
    description: string | null; // String
    id: number; // Int!
    movie: NexusGenRootTypes['Movie'] | null; // Movie
    movieId: string; // String!
    rating: number; // Float!
    title: string | null; // String
    updatedAt: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
    userId: number; // Int!
  }
  User: { // field return type
    avatarId: string | null; // String
    avatarURL: string | null; // String
    email: string; // String!
    favourited: NexusGenRootTypes['Movie'][]; // [Movie!]!
    firstName: string; // String!
    id: string; // ID!
    isVerified: boolean; // Boolean!
    lastName: string; // String!
    wrote_review: NexusGenRootTypes['Review'][]; // [Review!]!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createReview: { // args
      reviewInput: NexusGenInputs['ReviewInput']; // ReviewInput!
    }
    deleteReview: { // args
      reviewWhere: NexusGenInputs['ReviewWhere']; // ReviewWhere!
    }
    loginUser: { // args
      loginInput: NexusGenInputs['LoginInput']; // LoginInput!
    }
    registerUser: { // args
      registerInput: NexusGenInputs['RegisterInput']; // RegisterInput!
    }
    updateReview: { // args
      reviewInput: NexusGenInputs['ReviewInput']; // ReviewInput!
      reviewWhere: NexusGenInputs['ReviewWhere']; // ReviewWhere!
    }
    updateUser: { // args
      userInput: NexusGenInputs['UserInput']; // UserInput!
    }
  }
  Query: {
    genre: { // args
      genreWhere: NexusGenInputs['GenreWhere']; // GenreWhere!
    }
    movie: { // args
      movieWhere: NexusGenInputs['MovieWhere']; // MovieWhere!
    }
    person: { // args
      personWhere: NexusGenInputs['PersonWhere']; // PersonWhere!
    }
    review: { // args
      reviewWhere: NexusGenInputs['ReviewWhere']; // ReviewWhere!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthUser" | "Genre" | "Movie" | "Mutation" | "Neo4jUser" | "Person" | "Query" | "Review" | "User";

export type NexusGenInputNames = "GenreWhere" | "LoginInput" | "MovieWhere" | "PersonWhere" | "RegisterInput" | "ReviewInput" | "ReviewWhere" | "UserInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}