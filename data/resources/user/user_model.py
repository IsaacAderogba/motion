from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import Movie

class User(BaseModel):
    __primarykey__ = "user_id"

    first_name = Property()
    last_name = Property()

    acted_in = RelatedTo(Movie)
