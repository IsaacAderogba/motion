from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel


class PersonModel(BaseModel):
    __primarykey__ = "name"
    __primarylabel__ = "Person"

    id = Property()
    name = Property()

    acted_in = RelatedTo(MovieModel)
    directed = RelatedTo(MovieModel)
    wrote = RelatedTo(MovieModel)

    def find_acted_in(self):
        pass

    def find_directed(self):
        pass

    def find_wrote(self):
        pass

    def json(self):
        return {
            **dict(self.__node__),
        }
