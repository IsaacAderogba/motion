// libs
import { extendType, arg, objectType } from "@nexus/schema";

// helpers
import { userMutationKeys, userQueryKeys } from "./userUtils";
import { AuthUser, RegisterInput, User } from "./userTypes";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field(userQueryKeys.user, {
      type: User,
      nullable: true,
      resolve: (parent, args, context) => {},
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field(userMutationKeys.registerUser, {
      type: AuthUser,
      nullable: false,
      args: {
        registerInput: arg({ type: RegisterInput, required: true }),
      },
      resolve: async (parent, args, context) => {},
    });
  },
});
