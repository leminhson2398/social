from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User
from shop.models import Shop, Product


class UserImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="userImages/%Y/%m/%d", blank=True, null=True)
	user 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'user_image'


class ShopImage(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4, db_index=True)
	image 	= models.ImageField(upload_to="shopImages/%Y/%m/%d", blank=True, null=True)
	shop 	= models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='images')
	upload 	= models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.id

	class Meta:
		ordering = ['-upload']
		db_table = 'shop_image'


class ProductImage(models.Model):
	product 	= models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
	image_url 	= models.URLField(max_length=200, null=False, blank=False)
	alt_text 	= models.CharField(max_length=100, null=False, blank=True)

	def __str__(self):
		return self.image_url

	def save(self, **kwargs):
		if not self.alt_text:
			self.alt_text = self.product.title.lower()
		super().save(**kwargs)
		return self.image_url

	class Meta:
		db_table = 'product_image'
