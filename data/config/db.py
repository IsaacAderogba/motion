from py2neo import Graph
import env

graph = Graph(
    host=env.NEO4J_HOST,
    port=env.NEO4J_PORT,
    user=env.NEO4J_USER,
    password=env.NEO4J_PASSWORD,
)
