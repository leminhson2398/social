import graphene
from image.models import ShopFile, UserFile
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload


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


class ShopDocumentUpload(graphene.Mutation):
	ok = graphene.Boolean(required=True)

	class Arguments:
		file = Upload(required=True)

	def mutate(self, info, file, **kwargs):
		print(info.context.FILES)
		# print(file.value)

		return ShopDocumentUpload(
			ok=True,
		)

class Mutation(graphene.ObjectType):
	upload_shop_document = ShopDocumentUpload.Field()
