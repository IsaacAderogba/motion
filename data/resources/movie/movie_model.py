from py2neo.ogm import Property, RelatedFrom, RelatedTo
from resources.model import BaseModel
from resources.genre.genre_model import GenreModel


class MovieModel(BaseModel):
    __primarykey__ = "title"
    __primarylabel__ = "Movie"

    id = Property()
    title = Property()
    year = Property()
    duration = Property()
    summary = Property()
    rating = Property()
    movieUrl = Property()

    directors = RelatedFrom("Person", "DIRECTED")
    writers = RelatedFrom("Person", "WROTE")
    actors = RelatedFrom("Person", "ACTED_IN")
    favourites = RelatedFrom("User", "FAVOURITED")
    reviews = RelatedFrom("Review", "REVIEWED_MOVIE")

    in_genre = RelatedTo(GenreModel, "IN_GENRE")

    def find_directors(self):
        return self.find_related_from("DIRECTED")

    def find_writers(self):
        return self.find_related_from("WROTE")

    def find_actors(self):
        return self.find_related_from("ACTED_IN")

    def find_favourites(self):
        return self.find_related_from("FAVOURITED")

    def find_reviews(self):
        return self.find_related_from("REVIEWED_MOVIE")

    def find_genres(self):
        return self.find_related_to(self.in_genre)

    def json(self):
        return {
            **dict(self.__node__),
            "directors": self.find_directors(),
            "writers": self.find_writers(),
            "actors": self.find_actors(),
            "favourites": self.find_favourites(),
            "reviews": self.find_reviews(),
            "in_genre": self.find_genres()
        }
