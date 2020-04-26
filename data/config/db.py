from py2neo import Graph
from .env import NEO4J_DATABASE_URL

graph = Graph(NEO4J_DATABASE_URL)
