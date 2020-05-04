from flask_restful import Resource, reqparse
from resources.user.user_model import UserModel


class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("id", type=int, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("firstName", type=str, required=True,
                        help="This field cannot be left blank")
    parser.add_argument("lastName", type=str, required=True,
                        help="This field cannot be left blank")

    def post(self, id):
        if UserModel.find_by_id(id):
            return {"message": "A user with id '{}' already exists.".format(id)}, 400

        data = User.parser.parse_args()
        user = UserModel(**data)
        user.save()

        return user.json(), 201

    def get(self, id):
        user = UserModel.find_by_id(id)

        if not user:
            return {"message": "A user with id '{}' doesn't exist.".format(id)}, 400

        return user.json(), 200

    def put(self, id):
        data = User.parser.parse_args()
        user = UserModel(**data)
        user.save()

        return user.json(), 200

    def delete(self, id):
        user = UserModel.find_by_id(id)
        userDetails = user.json()

        if user:
            user.delete()
            return userDetails, 200
        else:
            return {"message": "User with id of {} does not exist".format(id)}


class UserList(Resource):
    pass
