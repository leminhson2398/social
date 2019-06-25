from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from shops.models import Shop, Product
from django.utils.translation import gettext_lazy
from image.utils import Reference as Ref
from django.core.exceptions import ValidationError


def validate_file_type(value):
	ext_name = str(value.name).rsplit('.', 1)[1]
	if not ext_name in Ref.FILE_EXTS:
		raise ValidationError(
			gettext_lazy("%(value) is not a valid allowed file type."),
			params={'value': ext_name}
		)


class UserFile(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file    	= models.FileField(upload_to='userFiles/%Y/%m/%d', null=True, blank=True, validators=[validate_file_type])
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
			ext_name = str(self.file.name).rsplit('.', 1)[1].lower()
			if ext_name in Ref.DOC_EXTS and not ext_name in Ref.IMG_EXTS:
				self.file_type = Ref.DOC_TYPE
			elif ext_name in Ref.IMG_EXTS and not ext_name in Ref.DOC_EXTS:
				self.file_type = Ref.IMG_TYPE
			else:
				self.file_type = Ref.UKN_TYPE
		super(UserFile, self).save(*args, **kwargs)


class ShopFile(models.Model):
	id 			= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	file 		= models.FileField(upload_to="shopFiles/%Y/%m/%d", blank=True, null=True, validators=[validate_file_type])
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
			ext_name = str(self.file.name).rsplit('.', 1)[1].lower()
			if ext_name in Ref.DOC_EXTS and not ext_name in Ref.IMG_EXTS:
				self.file_type = Ref.DOC_TYPE
			elif ext_name in Ref.IMG_EXTS and not ext_name in Ref.DOC_EXTS:
				self.file_type = Ref.IMG_TYPE
			else:
				self.file_type = Ref.UKN_TYPE
		super(ShopFile, self).save(*args, **kwargs)
