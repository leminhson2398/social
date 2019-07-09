import graphene
from image.models import ProductImage, UserDocument, UserImage, ProductDocument
from graphene_django import DjangoObjectType
from graphene import ObjectType
from graphene_file_upload.scalars import Upload
from image.utils import Reference as Ref
from django.db.models import Q
import json


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


class CustomProductDocumentType(ObjectType):
	ok = graphene.Boolean(required=True)
	error = graphene.String(required=False)
	product_documents = graphene.List(ProductDocumentType, required=False)


class Query(graphene.ObjectType):
	user_image 			= graphene.Field(UserImageType)
	user_images 		= graphene.List(UserImageType)
	user_document 		= graphene.Field(UserDocumentType)
	user_documents 		= graphene.List(UserDocumentType)
	product_image 		= graphene.Field(ProductImageType)
	product_images 		= graphene.List(ProductImageType)
	product_documents 	= graphene.Field(
		CustomProductDocumentType,
		before=graphene.Date(required=False),
		after=graphene.Date(required=False),
	)

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

	def resolve_product_documents(self, info, **kwargs):
		ok, error, query_set = False, None, None
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to perform the operation."
		else:
			ok = True
			before, after = [kwargs.get(key, None) for key in ['before', 'after']]
			if before and after:
				query_set = ProductDocument.objects.filter(
					Q(upload__gt=after) & Q(upload__lt=before)
				)
			elif before or after:
				query_set = ProductDocument.objects.filter(
					Q(upload__gt=after) | Q(upload__lt=before)
				)
			else:
				query_set = ProductDocument.objects.all()

		return CustomProductDocumentType(
			ok=ok,
			error=error,
			product_documents=query_set,
		)


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
			# checks length of files and validate mime type, file size
			if len(files) > 0 and Ref.validate_mime_type(Ref.DOC, files) and Ref.validate_file_size(files):
				query = ProductDocument.objects.bulk_create(
					[ProductDocument(file=f, user=user) for f in files]
				)
				if len(query) > 0:
					ok = True
					message = f"Successfully uploaded {len(query)} documents to your shop."
				else:
					ok = False
					error = "Please try again later."
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
			if len(files) > 0 and Ref.validate_mime_type(Ref.DOC, files) and Ref.validate_file_size(files):
				query = UserDocument.objects.bulk_create(
					[UserDocument(file=f, user=user) for f in files]
				)
				if len(query) > 0:
					ok = True
					message = f"Successfully uploaded {len(query)} documents."
				else:
					ok = False
					error = "Please try again later."
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
			if len(images) > 0 and Ref.validate_mime_type(Ref.IMG, images):
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
	upload_product_document 	= ProductDocumentUpload.Field()
	upload_user_document 		= UserDocumentUpload.Field()
	upload_product_image	 	= ProductImageUpload.Field()
	upload_user_image    		= UserImageUpload.Field()

