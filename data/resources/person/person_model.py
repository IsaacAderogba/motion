from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import Movie

class Person(BaseModel):
    __primarykey__ = "uuid"

    uuid = Property()
    name = Property()

    acted_in = RelatedTo(Movie)
    directed = RelatedTo(Movie)
    wrote = RelatedTo(Movie)
