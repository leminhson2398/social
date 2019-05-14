from django.db import models
from django.contrib.auth.models import User
from shop.models import Product, Shop


class ProductComment(models.Model):
	"""
	related_name on owner field here means product comment
	"""
	owner 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_comments')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
	text 	= models.TextField(db_index=True, blank=True, null=True)
	image 	= models.ImageField(upload_to='commentImages/%Y/%m/%d', null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-created']
		db_table = 'product_comment'

	def __str__(self):
		return self.owner.username

	def get_absolute_url(self):
		pass

	def save(self, **kwargs):
		pass


class ShopComment(models.Model):
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='comments')
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shop_comments')
	text = models.TextField(db_index=True, blank=True, null=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering =  ['-created']
		db_table = 'shop_comment'

	def __str__(self):
		return self.owner.username

	def save(self, **kwargs):
		pass
