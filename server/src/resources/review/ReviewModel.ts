import { Model } from "objection";
import { INeo4jUser } from "../user/UserModel";

export interface IReviewModel<Id = number> {
  id: Id;
  userId: number;
  movieId: string;
}

export interface INeo4jReview extends IReviewModel {
  title?: string;
  description?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: INeo4jUser;
  reviewed_movie: any;
}

export class ReviewModel extends Model implements IReviewModel {
  id!: number;
  userId!: number;
  movieId!: string;

  $toData(): IReviewModel {
    return {
      id: this.id,
      userId: this.userId,
      movieId: this.movieId,
    };
  }

  static get tableName() {
    return "Reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "movieId"],
      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        movieId: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}
