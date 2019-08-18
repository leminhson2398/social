import graphene
from image.models import ProductImage, UserDocument, UserImage, ProductDocument
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType
from graphene_file_upload.scalars import Upload
from image.utils import Reference as Ref
from django.db.models import Q
from graphql_relay import from_global_id


class UserDocumentType(DjangoObjectType):
	class Meta:
		model = UserDocument
		filter_fields = {
			'upload': ['gt', 'lt']
		}
		interfaces = (graphene.relay.Node, )


class UserImageType(DjangoObjectType):
	class Meta:
		model = UserImage
		filter_fields = {
			'upload': ['gt', 'lt']
		}
		interfaces = (graphene.relay.Node, )


class ProductDocumentType(DjangoObjectType):
	class Meta:
		model = ProductDocument
		filter_fields = {
			'upload': ['gt', 'lt']
		}
		# filter_fields = ['upload']
		interfaces = (graphene.relay.Node, )


class ProductImageType(DjangoObjectType):
	class Meta:
		model = ProductImage
		filter_fields = {
			'upload': ['gt', 'lt']
		}
		interfaces = (graphene.relay.Node, )


class CustomFileType(ObjectType):
	"""common class returns documents, images"""
	ok 					= graphene.Boolean(required=True)
	error 				= graphene.String(required=False)
	product_documents 	= DjangoFilterConnectionField(ProductDocumentType, default_value=[])
	product_images 		= DjangoFilterConnectionField(ProductImageType, default_value=[])
	user_images			= DjangoFilterConnectionField(UserImageType, default_value=[])
	user_documents		= DjangoFilterConnectionField(UserDocumentType, default_value=[])


class Query(graphene.ObjectType):
	user_image 			= graphene.Field(UserImageType)
	user_document 		= graphene.Field(UserDocumentType)
	product_image 		= graphene.Field(ProductImageType)
	product_document 	= graphene.relay.Node.Field(ProductDocumentType)

	product_images 		= graphene.Field(CustomFileType)
	user_images 		= graphene.Field(CustomFileType)
	user_documents 		= graphene.Field(CustomFileType)
	# product_documents 	= graphene.Field(
	# 	CustomFileType,
	# 	upload__Gt=graphene.DateTime(required=False),
	# 	upload__Lt=graphene.DateTime(required=False)
	# )
	product_documents 	= DjangoFilterConnectionField(ProductDocumentType)


	def resolve_user_image(self, info, **kwargs):
		pass

	def resolve_user_document(self, info, **kwargs):
		pass

	def resolve_product_image(self, info, **kwargs):
		pass

	def resolve_product_document(self, info, **kwargs):
		pass

	def resolve_user_images(self, info, **kwargs):
		ok, error, result = False, None, None
		user = info.context.user
		if user.is_anonymous:
			error = "You have to log in to perform the operation."
			result = UserImage.objects.none()
		else:
			ok = True
			result = UserImage.objects.filter(user=user)

		return CustomFileType(
			ok=ok,
			error=error,
			user_images=result,
		)

	def resolve_user_documents(self, info, **kwargs):
		ok, error, result = False, None, None
		user = info.context.user
		if user.is_anonymous:
			error = "You have to login to perform the operation."
			result = UserDocument.objects.none()
		else:
			ok = True
			result = UserDocument

		return CustomFileType(
			ok=ok,
			error=error,
			user_documents=result,
		)

	def resolve_product_images(self, info, **kwargs):
		ok, error, result = False, None, None
		user = info.context.user
		if user.is_anonymous:
			error = "You have to login to perform the operation."
			result = ProductImage.objects.none()
		else:
			ok = True
			result = ProductImage.objects.filter(user=user)

		return CustomFileType(
			ok=ok,
			error=error,
			product_images=result,
		)

	# def resolve_product_documents(self, info):
	# 	ok, error, result = False, None, None
	# 	user = info.context.user

	# 	if user.is_anonymous:
	# 		error = "You have to log in to perform the operation."
	# 		result = ProductDocument.objects.none()
	# 	else:
	# 		ok = True
	# 		result = ProductDocument.objects.filter(user=user)

	# 	return CustomFileType(
	# 		ok=ok,
	# 		error=error,
	# 		product_documents=result,
	# 	)
	def resolve_product_documents(self, info):
		user = info.context.user
		if user.is_anonymous:
			return ProductDocument.objetcs.none()
		else:
			return ProductDocument.objects.filter(user=user)


class ProductDocumentUpload(graphene.Mutation):
	ok 		= graphene.Boolean(required=True)
	error 	= graphene.String(required=False)
	message = graphene.String(required=False)
	files 	= DjangoFilterConnectionField(ProductDocumentType, default_value=[])

	class Arguments:
		files = graphene.NonNull(
			graphene.List(Upload, required=True)
		)

	def mutate(self, info, **kwargs):
		ok, error, message, files = False, None, None, []
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to upload file."
		elif user and not user.shop.active:
			error = "Your shop is not activated yet, please activate it first."
		else:
			inputFiles = kwargs.get('files', [])
			# checks length of files and validate mime type, file size
			if len(inputFiles) and Ref.validate_mime_type(Ref.DOC, inputFiles) and Ref.validate_file_size(inputFiles):
				query = ProductDocument.objects.bulk_create(
					[ProductDocument(file=f, user=user) for f in inputFiles]
				)
				query_length = len(query)
				if query_length:
					ok = True
					message = f"Successfully uploaded {query_length} documents to your shop."
					files = query
				else:
					ok = False
					error = "Please try again later."
			else:
				error = f"Please choose files have extension of {Ref.DOC_EXTS} and file size less than 2MB."

		return ProductDocumentUpload(
			ok=ok,
			error=error,
			message=message,
			files=files,
		)


class RemoveProductDocument(graphene.relay.ClientIDMutation):
	ok 			= graphene.Boolean(required=True)
	error 		= graphene.String(required=False)
	message 	= graphene.String(required=False)
	documents 	= graphene.List(ProductDocumentType, required=True)

	class Input:
		ids = graphene.NonNull(
			graphene.List(graphene.ID, required=True)
		)

	def mutate_and_get_payload(self, info, **kwargs):
		ok, error, message, documents = False, None, None, []
		user = info.context.user

		if user.is_anonymous:
			error = "You have to log in to delete files."
		else:
			ids = kwargs.get('ids', [])
			if len(ids):
				query = user.product_documents.filter(
					Q(id__in=[from_global_id(id)[1] for id in ids])
				)
				if query.count():
					documents.extend(query)
					delete_query = query.delete()
					# delete_query: (total_number_of_object_deleted, {'field_name': number_of_object_belong_to_this_field_deleted, ...})
					if delete_query[0]:
						ok = True
						message = f"Successfully deleted {delete_query[0]} document(s)."
					else:
						error = "Error deleting documents, please try again later."
						documents.clear()
				else:
					error = "Found no documents match your files."
			else:
				error = "You need to check at least one(1) file."

		return RemoveProductDocument(
			ok=ok,
			message=message,
			error=error,
			documents=documents,
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
			if len(images) > 0 and Ref.validate_mime_type(Ref.IMG, images) and Ref.validate_file_size(images):
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
			if len(images) > 0 and Ref.validate_mime_type(Ref.IMG, images) and Ref.validate_file_size(images):
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


class RelayMutation(graphene.AbstractType):
	remove_product_document		= RemoveProductDocument.Field()
