from django.db import models
from django.contrib.auth.models import User
from shops.models import Product, Shop
from uuid import uuid4


class ProductComment(models.Model):
	"""
	related_name on owner field here means product comment
	"""
	id 		= models.UUIDField(primary_key=True, default=uuid4)
	owner 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='product_comments')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
	text 	= models.TextField(blank=True, null=True)
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
	id = models.UUIDField(primary_key=True, default=uuid4)
	shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='comments')
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shop_comments')
	text = models.TextField(blank=True, null=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering =  ['-created']
		db_table = 'shop_comment'

	def __str__(self):
		return self.owner.username

	def save(self, **kwargs):
		pass


# class PostComment(models.Model):
# 	id = models.UUIDField(primary_key=True, default=uuid4)
# 	post = models.ForeignKey( on_delete=models.CASCADE, related_name='comments')
# 	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_comments')
# 	text = models.TextField()
# 	file = models.FileField(upload_to='postCommentFiles/%Y/%m/%d', blank=True, null=True)
# 	created = models.DateTimeField(auto_now_add=True)
# 	updated = models.DateTimeField(auto_now=True)

# 	class Meta:
# 		ordering = ['-created']
# 		db_table = 'post_comment'

# 	def __str__(self):
# 		return self.id

# 	def save(self, **kwargs):
# 		pass

