import graphene
from image.models import ProductImage, UserDocument, UserImage, ProductDocument
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload
from image.utils import Reference as Ref


class UserDocumentType(DjangoObjectType):
	class Meta:
		model = UserDocument


class UserImageType(DjangoObjectType):
	class Meta:
		model = UserImage


class ProductDocumentType(DjangoObjectType):
	class Meta:
		model = ProductDocument


class ProductImageType(DjangoObjectType):
	class Meta:
		model = ProductImage


class Query(graphene.ObjectType):
	user_image 			= graphene.Field(UserImageType)
	user_images 		= graphene.List(UserImageType)
	user_document 		= graphene.Field(UserDocumentType)
	user_documents 		= graphene.List(UserDocumentType)
	product_image 		= graphene.Field(ProductImageType)
	product_images 		= graphene.List(ProductImageType)
	product_document 	= graphene.Field(ProductDocumentType)
	product_documents 	= graphene.List(ProductDocumentType)


	def resolve_user_image(self, info, **kwargs):
		pass

	def resolve_user_images(self, info, **kwargs):
		return UserImage.objects.all()

	def resolve_user_document(self, info, **kwargs):
		pass

	def resolve_user_documents(self, info, **kwargs):
		return UserDocument.objects.all()

	def resolve_product_image(self, info, **kwargs):
		pass

	def resolve_product_images(self, info, **kwargs):
		return ProductImage.objects.all()

	def resolve_product_document(self, info, **kwargs):
		pass

	def resolve_product_documents(self, info, **kwargs):
		return ProductDocument.objects.all()


class ProductDocumentUpload(graphene.Mutation):
	ok 		= graphene.Boolean(required=True)
	error 	= graphene.String(required=False)
	message = graphene.String(required=False)

	class Arguments:
		files = graphene.NonNull(
			graphene.List(Upload, required=True)
		)

	def mutate(self, info, **kwargs):
		ok, error, message = False, None, None
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to upload file."
		elif user and not user.shop.active:
			error = "Your shop is not activated yet, please activate it first."
		else:
			files = kwargs.get('files', [])
			if len(files) > 0 and Ref.validate_mime_type(Ref.DOC, files):
				ok = True
				message = f"Successfully uploaded {len(files)} documents to your shop."
			else:
				error = "Please choose files have valid extension."

		return ProductDocumentUpload(
			ok=ok,
			error=error,
			message=message,
		)


class UserDocumentUpload(graphene.Mutation):
	ok 		= graphene.Boolean(required=True)
	error 	= graphene.String(required=False)
	message = graphene.String(required=False)

	class Arguments:
		files = graphene.NonNull(
			graphene.List(Upload, required=True)
		)

	def mutate(self, info, **kwargs):
		ok, error, message = False, None, None
		user = info.context.user

		if user.is_anonymous:
			error = "You have to login to upload file."
		else:
			files = kwargs.get('files', [])
			if len(files) > 0 and Ref.validate_mime_type(Ref.DOC, files):
				ok = True
				message = f"Successfully uploaded {len(files)} documents."
			else:
				error = "Please choose files have valid extension."

		return UserDocumentUpload(
			ok=ok,
			error=error,
			message=message,
		)


class UserImageUpload(graphene.Mutation):
	ok 		= graphene.Boolean(required=True)
	error 	= graphene.String(required=False)
	message = graphene.String(required=False)

	class Arguments:
		files = graphene.NonNull(
			graphene.List(Upload, required=True)
		)

	def mutate(self, info, **kwargs):
		ok, error, message = False, None, None
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to upload image."
		else:
			images = kwargs.get('files', [])
			if len(images) and Ref.validate_mime_type(Ref.IMG, images):
				ok = True
				message = f"Successfully uploaded {len(images)} images."
			else:
				error = "Please choose images have valid extension."

		return UserImageUpload(
			ok=ok,
			error=error,
			message=message,
		)


class ProductImageUpload(graphene.Mutation):
	ok 		= graphene.Boolean(required=True)
	error 	= graphene.String(required=False)
	message = graphene.String(required=False)

	class Arguments:
		files = graphene.NonNull(
			graphene.List(Upload, required=True)
		)

	def mutate(self, info, **kwargs):
		ok, error, message = False, None, None
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to upload image."
		elif user and not user.shop.active:
			error = "Your shop is not activated yet. Please activate it first."
		else:
			images = kwargs.get('files', [])
			if len(images) > 0 and Ref.validate_mime_type(Ref.IMG, images):
				ok = True
				message = f"Successfully uploaded {len(images)} images to shop."
			else:
				error = "Please choose images have valid extension."

		return ProductImageUpload(
			ok=ok,
			message=message,
			error=error,
		)


class Mutation(graphene.ObjectType):
	upload_shop_document = ProductDocumentUpload.Field()
	upload_user_document = UserDocumentUpload.Field()
	upload_shop_image	 = ProductImageUpload.Field()
	upload_user_image    = UserImageUpload.Field()

