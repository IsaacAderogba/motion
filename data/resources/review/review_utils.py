from resources.user.user_model import UserModel
from resources.movie.movie_model import MovieModel

def validate_user_and_movie_exists(userId, movieId):
    # throw an error if they don't and chug that error along
    user = UserModel.find_by_id(userId)
    if not user:
        raise Exception("User with id of {} does not exist".format(userId))

    movie = MovieModel.find_by_id(movieId)
    if not movie:
        raise Exception("Movie with id of {} does not exist".format(movieId))

    return (user, movie)

def generate_review_object(review, user, movie):
    output = review.json()
    output['user'] = user.json()
    output['reviewed_movie'] = movie.json()