from py2neo.ogm import Property, RelatedFrom
from resources.model import BaseModel


class GenreModel(BaseModel):
    __primarykey__ = "name"
    __primarylabel__ = "Genre"

    id = Property()
    name = Property()

    movies = RelatedFrom("Movie", "IN_GENRE")

    def find_movies(self):
        return self.find_related_from("IN_GENRE")

    def json(self):
        return {
            **dict(self.__node__),
            "movies": self.find_movies()
        }
