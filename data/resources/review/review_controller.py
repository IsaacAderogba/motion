from flask_restful import Resource, reqparse
from resources.review.review_model import ReviewModel
from resources.review.review_utils import validate_user_and_movie_exists
from resources.user.user_model import UserModel
from resources.movie.movie_model import MovieModel
from resources.utils import generate_iso_date


class Review(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("id", type=int, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("userId", type=int, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("movieId", type=str, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("title", type=str, required=False,
                        help="This field cannot be left blank")
    parser.add_argument("description", type=str, required=False,
                        help="This field cannot be left blank")
    parser.add_argument("rating", type=float, required=True,
                        help="This field cannot be left blank")

    def post(self, id):
        if ReviewModel.find_by_id(id):
            return {"message": "A review with id '{}' already exists.".format(id)}, 400

        data = Review.parser.parse_args()

        try:
            user, movie = validate_user_and_movie_exists(
                data['userId'], data['movieId'])
        except Exception as err:
            return {"message": repr(err)}, 400

        createdAt = generate_iso_date()
        updatedAt = createdAt
        review = ReviewModel(**data, updatedAt=updatedAt, createdAt=createdAt)

        user.wrote_review.add(review)
        review.reviewed_movie.add(movie)

        user.save()
        review.save()

        return review.json(), 201

    def get(self, id):
        review = ReviewModel.find_by_id(id)

        if not review:
            return {"message": "A review with id '{}' doesn't exist.".format(id)}, 400

        return review.json(), 200

    def put(self, id):
        review = ReviewModel.find_by_id(id)

        if not review:
            return {"message": "A review with id '{}' doesn't exist.".format(id)}, 400
            
        data = Review.parser.parse_args()

        try:
            validate_user_and_movie_exists(
                data['userId'], data['movieId'])
        except Exception as err:
            return {"message": repr(err)}, 400

        updatedAt = generate_iso_date()
        review = ReviewModel(**data, updatedAt=updatedAt)

        review.save()
        return review.json(), 201

    def delete(self, id):
        review = ReviewModel.find_by_id(id)
        reviewDetails = review.json()

        if review:
            review.delete()
            return reviewDetails, 200
        else:
            return {"message": "Review with id of {} does not exist".format(id)}


class ReviewList(Resource):
    pass
