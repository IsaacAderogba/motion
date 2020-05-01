// libs
import { extendType, arg } from "@nexus/schema";

// helpers
import {
  AuthUser,
  RegisterInput,
  User,
  LoginInput,
  UserInput,
} from "./UserTypes";
import { userErrors } from "./UserUtils";

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

        const readUser = await UserController.readUser({ id: user.id });
        return { ...readUser, id: readUser.id.toString() };
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

    t.field("loginUser", {
      type: AuthUser,
      nullable: true,
      args: {
        loginInput: arg({ type: LoginInput, required: true }),
      },
      resolve: async (
        parent,
        { loginInput },
        { dataSources: { UserController } }
      ) => {
        const user = await UserController.loginUser({ ...loginInput });
        if (!user) throw userErrors.EmailPasswordWrong;

        return user;
      },
    });

    t.field("updateUser", {
      type: User,
      nullable: true,
      args: {
        userInput: arg({ type: UserInput, required: true }),
      },
      resolve: async (
        parent,
        { userInput },
        { dataSources: { UserController, UserFlaskAPI }, user }
      ) => {
        const result = await UserController.model.transaction(async (trx) => {
          const updatedUser = await UserController.updateUser(
            userInput,
            {
              id: user?.id,
            },
            trx
          );

          await UserFlaskAPI.putUser({
            ...updatedUser,
            id: updatedUser.id,
          });

          return updatedUser;
        });

        return { ...result, id: result.id.toString() };
      },
    });

    t.field("deleteUser", {
      type: User,
      nullable: false,
      resolve: async (
        parent,
        args,
        { dataSources: { UserController, UserFlaskAPI }, user }
      ) => {
        const result = await UserController.model.transaction(async (trx) => {
          const deletedUser = await UserController.deleteUser(
            { id: user.id },
            trx
          );

          await UserFlaskAPI.deleteUser(deletedUser.id);
          return deletedUser;
        });

        return { ...result, id: result.id.toString() };
      },
    });
  },
});
