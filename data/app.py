# TODO - Require JWT for API requests

from flask import Flask
from flask_restful import Api
from resources.user.user_controller import User
from resources.review.review_controller import Review


app = Flask(__name__)
api = Api(app)

api.add_resource(User, '/api/user/<int:id>')
api.add_resource(Review, '/api/review/<int:id>')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
