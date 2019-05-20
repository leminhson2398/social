import graphene
from image.models import ProductImage, UserImage, ShopImage
from graphene_django import DjangoObjectType


class ProductImageType(DjangoObjectType):
	class Meta:
		model = ProductImage


class UserImageType(DjangoObjectType):
	class Meta:
		model = UserImage


class ShopImageType(DjangoObjectType):
	class Meta:
		model = ShopImage


class Query(graphene.ObjectType):
	product_image = graphene.Field(ProductImageType)
	product_images = graphene.List(ProductImageType, search=graphene.String(required=True))
	user_image = graphene.Field(UserImageType)
	user_images = graphene.List(UserImageType)
	shop_image = graphene.Field(ShopImageType)
	shop_images = graphene.List(ShopImageType)

	def resolve_product_images(self, info, **kwargs):
		pass
