from __future__ import absolute_import
from graphene.types import Scalar
from graphql.language import ast
from uuid import UUID as _UUID


class Uuid(Scalar):
    """
    Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
    in fields, resolvers and input.
    """

    @staticmethod
    def serialize(uuid):
        if isinstance(uuid, str):
            uuid = _UUID(uuid)

        assert isinstance(uuid, _UUID), f"Expected UUID instance, received {uuid}"
        return str(uuid)

    @staticmethod
    def parse_literal(node):
        if isinstance(node, ast.StringValueNode):
            return _UUID(node.value)

    @staticmethod
    def parse_value(value):
        return _UUID(value)
