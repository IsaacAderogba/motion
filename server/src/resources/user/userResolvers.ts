// libs
import { extendType, arg } from "@nexus/schema";

// helpers
import { AuthUser, RegisterInput, User } from "./userTypes";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: User,
      nullable: true,
      resolve: async (
        parent,
        args,
        { dataSources: { UserController }, user }
      ) => {
        if (!user) return null;

        return UserController.readUser({ id: user.id });
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("registerUser", {
      type: AuthUser,
      nullable: false,
      args: {
        registerInput: arg({ type: RegisterInput, required: true }),
      },
      resolve: async (
        parent,
        { registerInput },
        { dataSources: { UserController, UserFlaskAPI } }
      ) => {
        const user = await UserController.model.transaction(async (trx) => {
          try {
            const registeredUser = await UserController.registerUser(
              registerInput,
              trx
            );

            await UserFlaskAPI.postUser({
              ...registeredUser,
              id: parseInt(registeredUser.id),
            });

            return registeredUser;
          } catch (err) {
            throw new Error(err);
          }
        });
        return user;
      },
    });
  },
});
