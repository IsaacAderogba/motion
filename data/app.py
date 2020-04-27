from flask import Flask
from resources.movie.movie_model import Movie

movie = Movie.find_by_id("Modern Times\xa0")
for genre in movie.in_genre._related_objects:
    print(genre[0].json())

app = Flask(__name__)

if __name__ == "__main__":
    app.run(port=5000, debug=True)