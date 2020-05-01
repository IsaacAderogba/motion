// libs
import { SQLDataSource } from "datasource-sql";
import { RESTDataSource } from "apollo-datasource-rest";

// helpers
import { IReviewModel, ReviewModel, INeo4jReview } from "./ReviewModel";
import { knexConfig } from "../../db/knexConfig";
import { Transaction } from "objection";

class _ReviewController extends SQLDataSource {
  model = ReviewModel;

  constructor() {
    super(knexConfig);
  }

  async createReview(
    review: Pick<INeo4jReview, "movieId" | "userId">,
    trx: Transaction
  ) {
    const insertedReview = await this.model.query(trx).insertAndFetch(review);

    return insertedReview.$toData();
  }

  async readReview(where: Partial<IReviewModel>) {
    const foundReview = await this.model
      .query()
      .findOne(where)
      .throwIfNotFound();

    return foundReview.$toData();
  }

  async updateReview(
    review: Partial<IReviewModel>,
    where: Partial<IReviewModel>,
    trx: Transaction
  ) {
    const foundReview = await this.model
      .query(trx)
      .findOne(where)
      .throwIfNotFound();

    const updatedReview = await foundReview.$query().patchAndFetch(review);
    return updatedReview.$toData();
  }

  async deleteReview(where: Pick<IReviewModel, "id">, trx: Transaction) {
    const deletedReview = await this.model
      .query(trx)
      .deleteById(where.id)
      .where(where)
      .returning("*")
      .first();

    return deletedReview.$toData();
  }
}

class _ReviewFlaskAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.FLASK_API_URL}/api`;
  }

  async postReview(review: INeo4jReview) {
    const savedReview = await this.post<INeo4jReview>(
      `/review/${review.id}`,
      review
    );
    return savedReview;
  }

  async putReview(review: INeo4jReview) {
    const updatedReview = await this.put<INeo4jReview>(
      `/review/${review.id}`,
      review
    );
    return updatedReview;
  }

  async deleteReview(id: INeo4jReview["id"]) {
    const deletedReview = await this.put<INeo4jReview>(`/review/${id}`);
    return deletedReview;
  }
}

export const ReviewController = new _ReviewController();
export const ReviewFlaskAPI = new _ReviewFlaskAPI();
