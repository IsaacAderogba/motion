import { objectType, inputObjectType } from "@nexus/schema";
import { Movie } from "../movie/MovieTypes";
import { Review } from "../review/ReviewTypes";

export const AuthUser = objectType({
  name: "AuthUser",
  definition(t) {
    t.id("id");
    t.string("firstName");
    t.string("lastName");
    t.string("avatarURL", { nullable: true });
    t.string("token");
    t.boolean("isVerified");
    t.field("user", {
      type: User,
      nullable: true,
      resolve: async (authUser, args, { dataSources: { UserController } }) => {
        const user = await UserController.readUser({
          id: parseInt(authUser.id),
        });
        return { ...user, id: user.id.toString() };
      },
    });
  },
});

export const Neo4jUser = objectType({
  name: "Neo4jUser",
  definition(t) {
    t.int("id", {
      nullable: false,
    });
    t.string("firstName", {
      nullable: false,
    });
    t.string("lastName", {
      nullable: false,
    });
    t.list.field("favourited", {
      type: Movie,
      nullable: false,
      resolve: async (parent, args, { dataSources: { UserFlaskAPI } }) => {
        const user = await UserFlaskAPI.readUser({ id: parent.id });
        return user.favourited;
      },
    });
    t.list.field("wrote_review", {
      type: Review,
      nullable: false,
      resolve: async (parent, args, { dataSources: { UserFlaskAPI } }) => {
        const user = await UserFlaskAPI.readUser({ id: parent.id });
        return user.wrote_review;
      },
    });
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id", {
      nullable: false,
    });
    t.string("firstName", {
      nullable: false,
    });
    t.string("lastName", {
      nullable: false,
    });
    t.string("email", {
      nullable: false,
    });
    t.string("avatarURL", {
      nullable: true,
    });
    t.string("avatarId", {
      nullable: true,
    });
    t.boolean("isVerified", {
      nullable: false,
    });
    t.list.field("favourited", {
      type: Movie,
      nullable: false,
      resolve: async (parent, args, { dataSources: { UserFlaskAPI } }) => {
        const user = await UserFlaskAPI.readUser({ id: parseInt(parent.id) });
        return user.favourited;
      },
    });
    t.list.field("wrote_review", {
      type: Review,
      nullable: false,
      resolve: async (parent, args, { dataSources: { UserFlaskAPI } }) => {
        const user = await UserFlaskAPI.readUser({ id: parseInt(parent.id) });
        return user.wrote_review;
      },
    });
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.string("email", { required: true });
    t.string("password", { required: true });
  },
});

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.string("firstName", { required: true });
    t.string("lastName", { required: true });
    t.string("email", { required: true });
    t.string("password", { required: true });
    t.string("avatarURL", { required: false });
  },
});

export const UserInput = inputObjectType({
  name: "UserInput",
  definition(t) {
    // exclude email and password from being updated for now
    t.string("firstName", { required: false });
    t.string("lastName", { required: false });
    t.boolean("isVerified", { required: false });
    t.string("photoId", { required: false });
  },
});
