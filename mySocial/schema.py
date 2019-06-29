import graphene
import shops.schema
import user.schema
import comment.schema
import image.schema
import graphql_jwt


class Query(
    user.schema.Query,
    shops.schema.Query,
    comment.schema.Query,
    image.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    user.schema.Mutation,
    shops.schema.Mutation,
    comment.schema.Mutation,
    image.schema.Mutation,
    graphene.ObjectType,
):
    token_auth      = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token    = graphql_jwt.Verify.Field()
    refresh_token   = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
