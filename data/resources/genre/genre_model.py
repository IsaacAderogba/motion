from py2neo.ogm import Property, RelatedFrom
from resources.model import BaseModel


class GenreModel(BaseModel):
    __primarykey__ = "name"
    __primarylabel__ = "Genre"

    name = Property()
    uuid = Property()

    movies = RelatedFrom("Movie", "IN_GENRE")

    def find_movies(self):
        pass

    def json(self):
        return {
            'name': self.name,
            'uuid': self.uuid
        }
