from py2neo.ogm import Property, RelatedFrom, RelatedTo
from resources.model import BaseModel
from resources.genre.genre_model import GenreModel


class MovieModel(BaseModel):
    __primarykey__ = "title"
    __primarylabel__ = "Movie"

    title = Property()
    uuid = Property()
    year = Property()
    duration = Property()
    summary = Property()
    rating = Property()
    movie_url = Property()

    directors = RelatedFrom("Person", "DIRECTED")
    writers = RelatedFrom("Person", "WROTE")
    actors = RelatedFrom("Person", "ACTED_IN")
    favourites = RelatedFrom("User", "FAVOURITED")

    in_genre = RelatedTo(GenreModel, "IN_GENRE")

    def find_directors(self):
        pass

    def find_writers(self):
        pass

    def find_actors(self):
        pass

    def find_favourites(self):
        pass

    def find_genres(self):
        pass

    def json(self):
        return {
            "title": self.title,
            "uuid": self.uuid,
            "year": self.year,
            "duration": self.duration,
            "summary": self.summary,
            "rating": self.rating,
            "movie_url": self.movie_url
        }
