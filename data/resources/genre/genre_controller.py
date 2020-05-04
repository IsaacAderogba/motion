from flask_restful import Resource
from resources.genre.genre_model import GenreModel


class Genre(Resource):
    def get(self, id):
        genre = GenreModel.find_by_id(id)

        if not genre:
            return {"message": "A genre with id '{}' doesn't exist.".format(id)}, 400

        return genre.json(), 200


class GenreList(Resource):
    pass
