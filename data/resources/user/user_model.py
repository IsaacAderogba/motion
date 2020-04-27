from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel

class UserModel(BaseModel):
    __primarykey__ = "user_id"
    __primarylabel__ = "User"

    user_id = Property()
    first_name = Property()
    last_name = Property()

    favourited = RelatedTo(MovieModel)

    def find_favourited(self):
        pass

    def json(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name
        }
