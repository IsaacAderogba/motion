from py2neo.ogm import Property, RelatedFrom, RelatedTo
from resources.model import BaseModel
from resources.movie.movie_model import MovieModel

class ReviewModel(BaseModel):
    __primarykey__ = "id"
    __primarylabel__ = "Review"

    id = Property()
    userId = Property()
    movieId = Property()
    title = Property()
    description = Property()
    rating = Property()
    createdAt = Property()
    updatedAt = Property()

    user = RelatedFrom("User", "WROTE_REVIEW")
    reviewed_movie = RelatedTo(MovieModel, "REVIEWED_MOVIE")