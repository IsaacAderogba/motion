from py2neo.ogm import GraphObject
from config.db import graph


class BaseModel(GraphObject):
    """
    Implements some basic functions to guarantee some standard functionality
    across all models. The main purpose here is also to compensate for some
    missing basic features that we expected from GraphObjects, and improve the
    way we interact with them.
    """

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    @property
    def all(self):
        return self.match(graph)

    def find(self):
        return self.match(graph, getattr(self, self.__primarykey__)).first()

    def save(self):
        found_model = self.find()

        if found_model:
            node = found_model.__node__
            for key in dict(node):
                if not getattr(self, key):
                    print(node[key])
                    setattr(self, key, node[key])

        graph.push(self)
