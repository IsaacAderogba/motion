from py2neo.ogm import Property, RelatedFrom, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel
from config.db import graph
import json


class ReviewModel(BaseModel):
    def __init__(self, *args, **kwargs):
        compositeId = {
            "movieId": kwargs['movieId'], "userId": kwargs['userId']}

        self.compositeId = json.dumps(compositeId)
        super(ReviewModel, self).__init__(*args, **kwargs)

    __primarykey__ = "compositeId"
    __primarylabel__ = "Review"

    id = Property()
    compositeId = Property()
    userId = Property()
    movieId = Property()
    title = Property()
    description = Property()
    rating = Property()
    createdAt = Property()
    updatedAt = Property()

    user = RelatedFrom("User", "WROTE_REVIEW")
    reviewed_movie = RelatedTo(MovieModel, "REVIEWED_MOVIE")

    def find_reviewed_movie(self):
        return self.find_related_to(self.reviewed_movie)

    def find_user(self):
        return self.find_related_from("WROTE_REVIEW")

    def json(self):        
        return {
            **dict(self.__node__),
            "user": self.find_user(),
            "reviewed_movie": self.find_reviewed_movie(),
        }
