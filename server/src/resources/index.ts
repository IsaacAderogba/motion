import { UserQuery, UserMutation } from "./user/UserResolvers";

export const Query = [UserQuery];
export const Mutation = [UserMutation];
export const Subscription: any[] = [];
export const Middleware: any[] = [];
