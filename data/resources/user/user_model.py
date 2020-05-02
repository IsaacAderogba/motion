from py2neo.ogm import Property, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel
from resources.review.review_model import ReviewModel


class UserModel(BaseModel):
    __primarykey__ = "id"
    __primarylabel__ = "User"

    id = Property()
    firstName = Property()
    lastName = Property()

    favourited = RelatedTo(MovieModel)
    wrote_review = RelatedTo(ReviewModel)

    def find_favourited(self):
        pass

    def find_wrote_review(self):
        return [wr.json() for wr in self.wrote_review]

    def json(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName
        }
