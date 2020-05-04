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
        return self.find_related_to(self.acted_in)

    def find_directed(self):
        return self.find_related_to(self.directed)

    def find_wrote(self):
        return self.find_related_to(self.wrote)

    def json(self):
        return {
            **dict(self.__node__),
            "acted_in": self.find_acted_in(),
            "directed": self.find_directed(),
            "wrote": self.find_wrote()
        }
