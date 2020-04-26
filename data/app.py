from flask import Flask
from resources.genre.genre_model import Genre
from config.db import graph

app = Flask(__name__)
genre = Genre(name="1234")
genre.save()

if __name__ == "__main__":
    app.run(port=5000, debug=True)