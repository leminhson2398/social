from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy
from image.utils import Reference as Ref
from shops.models import Product
from django.core.exceptions import ValidationError


def validate_file_type(value):
	ext_name = str(value.name).rsplit('.', 1)[1]
	if not ext_name in Ref.FILE_EXTS:
		raise ValidationError(
			gettext_lazy("%(value) is not a valid allowed file type."),
			params={'value': ext_name}
		)


class UserDocument(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file    	= models.FileField(upload_to='UserDocuments/%Y/%m/%d', validators=[validate_file_type])
	user 		= models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents', db_index=True)
	upload 		= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'user_document'
		index_together 	= ['id', 'user']

	def save(self, *args, **kwargs):
		super(UserDocument, self).save(*args, **kwargs)


class ProductDocument(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file 		= models.FileField(upload_to="ProductDocuments/%Y/%m/%d", validators=[validate_file_type], db_index=True)
	product 	= models.ForeignKey(Product, related_name='documents', on_delete=models.CASCADE)
	upload 		= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'product_document'
		index_together 	= ['id']

	def save(self, *args, **kwargs):
		super(ProductDocument, self).save(*args, **kwargs)


class UserImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="UserImages/%Y/%m/%d", validators=[validate_file_type])
	user 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='images', db_index=True)
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'user_image'
		index_together 	= ['id', 'user']


class ProductImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="ProductImages/%Y/%m/%d", validators=[validate_file_type], db_index=True)
	product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'product_image'
		index_together 	= ['id']
