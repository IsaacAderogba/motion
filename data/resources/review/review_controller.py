from flask_restful import Resource, reqparse
from resources.review.review_model import ReviewModel


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
        pass

    def get(self, id):
        pass

    def put(self, id):
        pass

    def delete(self, id):
        pass


class ReviewList(Resource):
    pass
