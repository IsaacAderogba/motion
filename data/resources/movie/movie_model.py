from py2neo.ogm import Property, RelatedFrom, RelatedTo
from resources.model import BaseModel
from resources.genre.genre_model import Genre
class Movie(BaseModel):
  __primarykey__ = "title"

  uuid = Property()
  title = Property()
  year = Property()
  duration = Property()
  summary = Property()
  rating = Property()
  movie_url = Property()

  directors = RelatedFrom("Person", "DIRECTED")
  writers = RelatedFrom("Person", "WROTE")
  actors = RelatedFrom("Person", "ACTED_IN")
  favourited_by = RelatedFrom("User", "FAVOURITED_BY")

  genres = RelatedTo(Genre)

