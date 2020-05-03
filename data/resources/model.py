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
        return cls.match(graph).where(id=id).first()

    @classmethod
    def find_all(cls):
        return cls.match(graph)

    def find_related_from(self, r_type):
        items = []
        for rel in graph.match(nodes=(None, self.__node__), r_type=r_type):
            # required to print this out for some reason, otherwise
            # the dict method returns an empty object
            print("***NODE***", rel.start_node)
            items.append(dict(rel.start_node))

        return items

    def find_related_to(self, relations):
        items = []
        for r in relations:
            # required to print this out for some reason, otherwise
            # the dict method returns an empty object
            print("***NODE***", r.__node__)
            items.append(dict(r.__node__))

        return items

    def delete(self):
        graph.delete(self)

    def save(self):
        found_model = self.find_by_id(self.id)

        if found_model:
            node = found_model.__node__
            for key in dict(node):
                if not getattr(self, key):
                    setattr(self, key, node[key])

        graph.push(self)
