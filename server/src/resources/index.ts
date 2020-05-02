import { UserQuery, UserMutation } from "./user/UserResolvers";
import { ReviewMutation, ReviewQuery } from "./review/ReviewResolvers";

export const Query = [UserQuery, ReviewQuery];
export const Mutation = [UserMutation, ReviewMutation];
export const Subscription: any[] = [];
export const Middleware: any[] = [];
