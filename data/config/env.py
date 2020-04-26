from environs import Env

env = Env()


DEBUG = env.bool('DEBUG', default=False)
HOST = env('HOST', default='127.0.0.1')
PORT = env.int('PORT', default=5000)

NEO4J_HOST = env('NEO4J_HOST', default='localhost')
NEO4J_PORT = env.int('NEO4J_PORT', default=7687)
NEO4J_USER = env('NEO4J_USER', default='neo4j')
NEO4J_PASSWORD = env('NEO4J_PASSWORD', default='admin')
