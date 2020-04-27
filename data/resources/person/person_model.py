from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import Movie

class Person(BaseModel):
    __primarykey__ = "name"

    name = Property()
    uuid = Property()

    acted_in = RelatedTo(Movie)
    directed = RelatedTo(Movie)
    wrote = RelatedTo(Movie)

    def find_acted_in(self):
        pass

    def find_directed(self):
        pass

    def find_wrote(self):
        pass

    def json(self):
        return {
            "name": self.name,
            "uuid": self.uuid
        }
