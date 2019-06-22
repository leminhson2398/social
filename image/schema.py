import graphene
from image.models import ShopFile, UserFile
from graphene_django import DjangoObjectType


class UserFileType(DjangoObjectType):
	class Meta:
		model = UserFile


class ShopFileType(DjangoObjectType):
	class Meta:
		model = ShopFile


class Query(graphene.ObjectType):
	# product_image = graphene.Field(ProductImageType)
	# product_images = graphene.List(ProductImageType, search=graphene.String(required=True))
	user_image = graphene.Field(UserFileType)
	user_images = graphene.List(UserFileType)
	shop_image = graphene.Field(ShopFileType)
	shop_images = graphene.List(ShopFileType)

	def resolve_product_images(self, info, **kwargs):
		pass


# class UploadStringImage(graphene.Mutation):
# 	ok 		= graphene.Boolean(required=True)
# 	image 	= graphene.String(required=True)
# 	error 	= graphene.String(required=False)

# 	class Arguments:
# 		imageString = graphene.String(required=True)
# 		name = graphene

# 	def mutate(self, info, **kwargs):

