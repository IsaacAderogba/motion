from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel

class UserModel(BaseModel):
    __primarykey__ = "id"
    __primarylabel__ = "User"

    id = Property()
    firstName = Property()
    lastName = Property()

    favourited = RelatedTo(MovieModel)

    def find_favourited(self):
        pass

    def json(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName
        }
