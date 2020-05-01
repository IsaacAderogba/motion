from py2neo.ogm import Property, RelatedFrom
from resources.model import BaseModel


class GenreModel(BaseModel):
    __primarykey__ = "name"
    __primarylabel__ = "Genre"

    id = Property()
    name = Property()

    movies = RelatedFrom("Movie", "IN_GENRE")

    def find_movies(self):
        pass

    def json(self):
        return {
            'id': self.id,
            'name': self.name
        }
