from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import Movie

class User(BaseModel):
    __primarykey__ = "user_id"

    user_id = Property()
    first_name = Property()
    last_name = Property()

    favourited = RelatedTo(Movie)

    def find_favourited(self):
        pass

    def json(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name
        }
