from py2neo.ogm import Property, RelatedFrom
from resources.model import BaseModel

class Genre(BaseModel):
  __primarykey__ = "uuid"

  uuid = Property()
  name = Property()

  movies = RelatedFrom("Movie", "IN_GENRE")

