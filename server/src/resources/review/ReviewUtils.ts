import { UserInputError } from "apollo-server-express";

export const reviewQueryKeys = {
  review: "review",
};

export const reviewMutationKeys = {
  createReview: "createReview",
  updateReview: "updateReview",
  deleteReview: "deleteReview",
};

export const reviewErrors = {
  ReviewAlreadyExists: new UserInputError("Review already exists"),
};
