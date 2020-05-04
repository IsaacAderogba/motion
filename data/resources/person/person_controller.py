from flask_restful import Resource
from resources.person.person_model import PersonModel


class Person(Resource):
    def get(self, id):
        person = PersonModel.find_by_id(id)

        if not person:
            return {"message": "A person with id '{}' doesn't exist.".format(id)}, 400

        return person.json(), 200


class PersonList(Resource):
    pass
