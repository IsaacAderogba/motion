from py2neo.ogm import GraphObject
from config.db import graph


class BaseModel(GraphObject):
    """
    Implements some basic functions to guarantee some standard functionality
    across all models. The main purpose here is also to compensate for some
    missing basic features that we expected from GraphObjects, and improve the
    way we interact with them.
    """

    def __init__(self, *args, **kwargs):
        for key, value in kwargs.items():
            if not getattr(self, key) and hasattr(self, key):
                setattr(self, key, value)

    @classmethod
    def find_by_id(cls, id):
        # return graph.nodes.match(cls.__primarylabel__, id=id).first()
        return cls.match(graph).where(id=id).first()

    @classmethod
    def find_all(cls):
        return cls.match(graph)

    def delete(self):
        graph.delete(self)

    def save(self):
        found_model = self.find_by_id(self.id)
        print(found_model)

        if found_model:
            node = found_model.__node__
            for key in dict(node):
                if not getattr(self, key):
                    setattr(self, key, node[key])

        graph.push(self)
