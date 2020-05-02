import { UserQuery, UserMutation } from "./user/UserResolvers";
import { ReviewMutation } from "./review/ReviewResolvers";

export const Query = [UserQuery];
export const Mutation = [UserMutation, ReviewMutation];
export const Subscription: any[] = [];
export const Middleware: any[] = [];
