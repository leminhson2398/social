from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from shops.models import Shop, Product
from os.path import splitext


class UserFile(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file    	= models.FileField(upload_to='userFiles/%Y/%m/%d', null=True, blank=True)
	user 		= models.ForeignKey(User, on_delete=models.CASCADE, related_name='files', db_index=True)
	file_type 	= models.CharField(max_length=10, db_index=True)
	upload 		= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'user_image'
		index_together = ['id', 'file_type', 'user']

	def save(self, *args, **kwargs):
		if not self.file_type:
			ext_name = splitext(self.file.name)[1].lower()
			if ext_name in ['.doc', '.docx', '.pdf', '.xlsx']:
				self.file_type = 'document'
			elif ext_name in ['.png', '.jpeg', '.jpg', '.svg']:
				self.file_type = 'image'
			else:
				self.file_type = 'unknown'
		super(UserFile, self).save(*args, **kwargs)


class ShopFile(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file 		= models.FileField(upload_to="shopFiles/%Y/%m/%d", blank=True, null=True)
	shop 		= models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='files', db_index=True)
	file_type 	= models.CharField(max_length=10, db_index=True)	
	upload 		= models.DateTimeField(auto_now_add=True)
	product 	= models.ManyToManyField(Product, related_name='files')

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'shop_image'
		index_together = ['id', 'file_type', 'shop']

	def save(self, *args, **kwargs):
		if not self.file_type:
			ext_name = splitext(self.file.name)[1].lower()
			if ext_name in ['.doc', '.docx', '.pdf', '.xlsx']:
				self.file_type = 'document'
			elif ext_name in ['.png', '.jpeg', '.jpg', '.svg']:
				self.file_type = 'image'
			else:
				self.file_type = 'unknown'
		super(ShopFile, self).save(*args, **kwargs)
