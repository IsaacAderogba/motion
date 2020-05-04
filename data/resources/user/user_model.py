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
        return self.find_related_to(self.favourited)

    def find_wrote_review(self):
        return self.find_related_to(self.wrote_review)

    def json(self):
        return {
            **dict(self.__node__),
            "favourited": self.find_favourited(),
            "wrote_review": self.find_wrote_review()
        }
