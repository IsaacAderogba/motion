from environs import Env

env = Env()
env.read_env()

DEBUG = env.bool('DEBUG', default=False)
HOST = env('HOST', default='127.0.0.1')
PORT = env.int('PORT', default=5000)

NEO4J_DATABASE_URL = env('NEO4J_DATABASE_URL', default='')
