from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from shops.models import Shop, Product
from image.utils import Reference as Ref


class UserFile(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file    = models.FileField(upload_to='userFiles/%Y/%m/%d', null=True, blank=True)
	user 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='files', db_index=True)
	file_type = models.CharField(choices=Ref.FILE_TYPES, default='ukn', max_length=10, db_index=True)
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'user_image'
		index_together = ['id', 'file_type', 'user']


class ShopFile(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file 	= models.FileField(upload_to="shopFiles/%Y/%m/%d", blank=True, null=True)
	shop 	= models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='files', db_index=True)
	file_type = models.CharField(choices=Ref.FILE_TYPES, default='ukn', max_length=10, db_index=True)	
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'shop_image'
		index_together = ['id', 'file_type', 'shop']
