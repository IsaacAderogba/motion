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
            "id": self.id,
            "title": self.title,
            "year": self.year,
            "duration": self.duration,
            "summary": self.summary,
            "rating": self.rating,
            "movieUrl": self.movieUrl
        }
