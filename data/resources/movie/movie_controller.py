from flask_restful import Resource
from resources.movie.movie_model import MovieModel


class Movie(Resource):
    def get(self, id):
        movie = MovieModel.find_by_id(id)

        if not movie:
            return {"message": "A movie with id '{}' doesn't exist.".format(id)}, 400

        return movie.json(), 200


class MovieList(Resource):
    pass
