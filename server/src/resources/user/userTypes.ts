import { objectType, inputObjectType } from "@nexus/schema";

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
      resolve: (authUser, args, { dataSources: { UserController} }) => {
        return UserController.readUser({ id: parseInt(authUser.id) });
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
