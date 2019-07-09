from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from image.utils import Reference as Ref


class UserDocument(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file    	= models.FileField(upload_to='UserDocuments/%Y/%m/%d')
	user 		= models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents', db_index=True)
	upload 		= models.DateTimeField(auto_now_add=True, db_index=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'user_document'
		index_together 	= ['id', 'user', 'upload']

	def save(self, *args, **kwargs):
		super(UserDocument, self).save(*args, **kwargs)


class ProductDocument(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file 		= models.FileField(upload_to="ProductDocuments/%Y/%m/%d")
	user 		= models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_documents')
	upload 		= models.DateTimeField(auto_now_add=True, db_index=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'product_document'
		index_together 	= ['id', 'upload']

	def save(self, *args, **kwargs):
		super(ProductDocument, self).save(*args, **kwargs)


class UserImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="UserImages/%Y/%m/%d")
	user 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='images', db_index=True)
	upload 	= models.DateTimeField(auto_now_add=True, db_index=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'user_image'
		index_together 	= ['id', 'user', 'upload']


class ProductImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="ProductImages/%Y/%m/%d")
	user 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_images')
	upload 	= models.DateTimeField(auto_now_add=True, db_index=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		ordering 		= ['-upload']
		db_table 		= 'product_image'
		index_together 	= ['id', 'upload']
