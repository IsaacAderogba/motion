from flask_restful import Resource, reqparse
from resources.user.user_model import UserModel


class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("user_id", type=int, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("first_name", type=str, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("last_name", type=str, required=True,
                        help="This field cannot be left blank")

    def post(self, user_id):
        if UserModel.find_by_id(user_id):
            return {"message": "A user with id '{}' already exists.".format(user_id)}, 400

        data = User.parser.parse_args()
        user = UserModel(**data)
        user.save()

        return user.json(), 201


class UserList(Resource):
    pass
