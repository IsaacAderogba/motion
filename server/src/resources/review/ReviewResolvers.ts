// libs
import { extendType, arg } from "@nexus/schema";
import { Review, ReviewInput } from "./ReviewTypes";

// helpers

// export const ReviewQuery = extendType({
//   type: "Query",
//   definition(t) {
//     t.field('review', {
//       type:
//     })
//   }
// })

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
        const review = await ReviewController.model.transaction(async (trx) => {
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

        console.log(review);
        return review;
      },
    });
  },
});
