import graphene
from graphene_django import DjangoObjectType
from comment.models import ProductComment, ShopReview, ProductReview
from django.db.models import Q, F
from graphene_file_upload.scalars import Upload
from shops.models import Product


class ShopReviewType(DjangoObjectType):
	class Meta:
		model = ShopReview


class ProductReviewType(DjangoObjectType):
	class Meta:
		model = ProductReview


class ProductCommentType(DjangoObjectType):
	class Meta:
		model = ProductComment


class Query(graphene.ObjectType):
	shop_reviews = graphene.List(ShopReviewType)
	product_comments = graphene.List(ProductCommentType)
	product_reviews = graphene.List(ProductReviewType)
	shop_review = graphene.Field(
		ShopReviewType,
		search=graphene.Int(required=True)
	)
	product_comment = graphene.Field(
		ProductCommentType,
		search=graphene.Int(required=True)
	)
	product_review = graphene.Field(
		ProductReviewType,
		search=graphene.Int(required=True)
	)

	def resolve_shop_reviews(self, info):
		return ShopReview.objects.all()

	def resolve_product_comments(self, info):
		return ProductComment.objects.all()

	def resolve_product_reviews(self, info):
		return ProductReview.objects.all()

	def resolve_shop_review(self, info, **kwargs):
		search = kwargs.get('search', None)
		if search:
			try:
				shop_review = ShopReview.objects.get(Q(id=search))
			except ShopReview.DoesNotExist:
				raise Exception("Couldn't find the comment.")
			else:
				return shop_review
		else:
			raise Exception("You must enter a comment text.")

	def resolve_product_comment(self, info, **kwargs):
		search = kwargs.get('search', None)
		if search:
			try:
				product_comment = ProductComment.objects.get(Q(id=search))
			except ProductComment.DoesNotExist:
				raise Exception("Couldn't find the comment")
			else:
				return product_comment
		else:
			raise Exception("You must enter a comment text")

	def resolve_product_review(self, info, **kwargs):
		search = kwargs.get('search', None)
		if search is not None:
			try:
				product_review = ProductReview.objects.get(id=search)
			except ProductReview.DoesNotExist:
				raise Exception("Couldn't find the review")
			else:
				return product_review
		else:
			raise Exception("You must enter a review id")

	
# class CreateShopReview(graphene.Mutation):
# 	comment = graphene.Field(ShopReviewType)

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
	ok = graphene.Boolean(required=True)
	comment = graphene.Field(ProductCommentType, required=True)
	error = graphene.String(required=False)

	class Arguments:
		text = graphene.String(required=False)
		image = Upload(required=False)
		product = graphene.Int(required=True)

	def mutate(self, info, file, **kwargs):
		"""
		file is created based on graphene_file_upload
		"""
		ok, comment, error = False, None, None

		user = info.context.user
		if user.is_anonymous:
			return CreateProductComment(
				ok=ok,
				comment=comment,
				error='You must be logged in to post comment.'
			)

		product, text = [kwargs.get(key, None) for key in ['product', 'text']]
		if product:
			try:
				product = Product.objects.get(id=product)
			except Product.DoesNotExist:
				ok = False
				error = 'Could not find any product you are looking for.'
				comment = None
			else:
				if text or file:
					comment = product.comments.create(text=text, image=file)
					ok=True
				else:
					ok = False
					comment = None
					error = "You must enter some text or images."
		
		return CreateProductComment(
			ok=ok,
			comment=comment,
			error=error
		)


# class UpdateProductComment(graphene.Mutation):
# 	comment = graphene.Field(ProductCommentType, required=True)

# 	class Arguments:
# 		text = graphene.String(required=False)
# 		image = Upload()


class Mutation(graphene.ObjectType):
	create_product_comment = CreateProductComment.Field()
