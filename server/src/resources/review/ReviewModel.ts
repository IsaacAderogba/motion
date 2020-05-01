import { Model } from "objection";

export interface IReviewModel<Id = number> {
  id: Id;
  userId: number;
  movieId: string;
}

export class ReviewModel extends Model implements IReviewModel {
  id!: number;
  userId!: number;
  movieId!: string;

  toData(): IReviewModel {
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
