// libs
import { extendType, arg } from "@nexus/schema";
import { Review, ReviewInput, ReviewWhere } from "./ReviewTypes";

// helpers

export const ReviewQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("review", {
      type: Review,
      nullable: true,
      args: {
        reviewWhere: arg({ type: ReviewWhere, required: true }),
      },
      resolve: async (
        parent,
        { reviewWhere },
        { dataSources: { ReviewFlaskAPI } }
      ) => {
        const fetchedReview = await ReviewFlaskAPI.readReview({
          ...reviewWhere,
          id: parseInt(reviewWhere.id),
        });

        return { ...fetchedReview, id: fetchedReview.id.toString() };
      },
    });
  },
});

export const ReviewMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createReview", {
      type: Review,
      nullable: false,
      args: {
        reviewInput: arg({ type: ReviewInput, required: true }),
      },
      resolve: async (
        parent,
        { reviewInput: { movieId, rating, description, title } },
        { dataSources: { ReviewController, ReviewFlaskAPI }, user }
      ) => {
        return ReviewController.model.transaction(async (trx) => {
          const createdReview = await ReviewController.createReview(
            { userId: user.id, movieId },
            trx
          );

          const fetchedReview = await ReviewFlaskAPI.postReview({
            rating,
            description,
            title,
            ...createdReview,
          });

          return { ...fetchedReview, id: fetchedReview.id.toString() };
        });
      },
    });

    t.field("updateReview", {
      type: Review,
      nullable: false,
      args: {
        reviewWhere: arg({ type: ReviewWhere, required: true }),
        reviewInput: arg({ type: ReviewInput, required: true }),
      },
      resolve: async (
        parent,
        { reviewWhere, reviewInput },
        { dataSources: { ReviewFlaskAPI, ReviewController }, user }
      ) => {
        return ReviewController.model.transaction(async (trx) => {
          try {
            const foundReview = await ReviewController.readReview({
              ...reviewWhere,
              id: parseInt(reviewWhere.id),
            });

            const updatedReview = await ReviewFlaskAPI.putReview({
              ...foundReview,
              ...reviewInput,
            });

            return { ...updatedReview, id: updatedReview.id.toString() };
          } catch (err) {
            throw new Error(err);
          }
        });
      },
    });

    t.field("deleteReview", {
      type: Review,
      nullable: false,
      args: {
        reviewWhere: arg({ type: ReviewWhere, required: true }),
      },
      resolve: async (
        parent,
        { reviewWhere },
        { dataSources: { ReviewController, ReviewFlaskAPI } }
      ) => {
        return ReviewController.model.transaction(async (trx) => {
          const deletedReview = await ReviewController.deleteReview(
            {
              ...reviewWhere,
              id: parseInt(reviewWhere.id),
            },
            trx
          );

          const fetchedReview = await ReviewFlaskAPI.deleteReview(
            deletedReview.id
          );

          return { ...fetchedReview, id: fetchedReview.id.toString() };
        });
      },
    });
  },
});
