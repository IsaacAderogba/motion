import { UserQuery, UserMutation } from "./user/UserResolvers";
import { ReviewMutation, ReviewQuery } from "./review/ReviewResolvers";
import { MovieQuery } from './movie/MovieResolvers';
import { GenreQuery } from './genre/GenreResolvers';

export const Query = [UserQuery, ReviewQuery, MovieQuery, GenreQuery];
export const Mutation = [UserMutation, ReviewMutation];
export const Subscription: any[] = [];
export const Middleware: any[] = [];
