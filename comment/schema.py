import graphene
from graphene_django import DjangoObjectType
from comment.models import ProductComment, ShopComment
from django.db.models import Q, F
from graphene_file_upload.scalars import Upload
from shop.models import Product


class ShopCommentType(DjangoObjectType):
	class Meta:
		model = ShopComment


class ProductCommentType(DjangoObjectType):
	class Meta:
		model = ProductComment


class Query(graphene.ObjectType):
	shop_comments = graphene.List(ShopCommentType)
	product_comments = graphene.List(ProductCommentType)
	product_comment = graphene.Field(
		ProductCommentType,
		search=graphene.String(required=True)
	)
	shop_comment = graphene.Field(
		ShopCommentType,
		search=graphene.String(required=True)
	)

	def resolve_shop_comments(self, info):
		return ShopComment.objects.all()

	def resolve_product_comments(self, info):
		return ProductComment.objects.all()

	def resolve_shop_comment(self, info, **kwargs):
		search = kwargs.get('search', '')
		if search:
			try:
				product_comment = ProductComment.objects.get(Q(text__icontains=search))
			except ProductComment.DoesNotExist:
				raise Exception("Couldn't find the comment.")
			else:
				return product_comment
		else:
			raise Exception("You must enter a comment text.")

	def resolve_product_comment(self, info, **kwargs):
		search = kwargs.get('search', '')
		if search:
			try:
				shop_comment = ShopComment.objects.get(Q(text__icontains=search))
			except ShopComment.DoesNotExist:
				raise Exception("Couldn't find the comment")
			else:
				return shop_comment
		else:
			raise Exception("You must enter a comment text")

	
# class CreateShopComment(graphene.Mutation):
# 	comment = graphene.Field(ShopCommentType)

# 	class Arguments:
# 		text = graphene.String(required=False)

# 	def mutate(self, info, **kwargs):
# 		"""
# 		only accept user who purchased a product before to comment
# 		"""
# 		user = info.context.user
# 		if user.is_anonymous:
# 			raise Exception("You must login to post new question")
# 		pass


class CreateProductComment(graphene.Mutation):
	comment = graphene.Field(ProductCommentType, required=True)

	class Arguments:
		text = graphene.String(required=False)
		image = Upload(required=False)
		product = graphene.String(required=True)

	def mutate(self, info, file, **kwargs):
		user = info.context.user
		if user.is_anonymous:
			raise Exception("You must login to post a comment")

		product, text = [kwargs.get(key, '') for key in ['product', 'text']]
		if (file or text) and product:
			try:
				product = Product.objects.get(id=product)
			except Product.DoesNotExist:
				raise Exception(f"Couldn't find the product with id={product!r}")
			else:
				comment = ProductComment(
					owner=user,
					text=text,
					product=product,
					image=file or None
				)
				comment.save()
			return CreateProductComment(comment=comment)
		else:
			raise Exception("Couldn't not post new comment.")


# class UpdateProductComment(graphene.Mutation):
# 	comment = graphene.Field(ProductCommentType, required=True)

# 	class Arguments:
# 		text = graphene.String(required=False)
# 		image = Upload()


class Mutation(graphene.ObjectType):
	create_product_comment = CreateProductComment.Field()
