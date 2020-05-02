from py2neo import Graph, Schema
from .env import NEO4J_DATABASE_URL

graph = Graph(NEO4J_DATABASE_URL)
schema = Schema(graph)

schema.create_uniqueness_constraint("User", "id")
schema.create_uniqueness_constraint("Genre", "name")
schema.create_uniqueness_constraint("Movie", "title")
schema.create_uniqueness_constraint("Person", "name")
schema.create_uniqueness_constraint("Review", "compositeId")

schema.create_index("Genre", "id")
schema.create_index("Movie", "id")
schema.create_index("Person", "id")
schema.create_index("Review", "id")