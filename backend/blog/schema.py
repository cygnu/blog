import graphene
import account.schema
import api.schema


class Query(account.schema.Query, api.schema.Query, graphene.ObjectType):
    pass


class Mutation(account.schema.Mutation, api.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
