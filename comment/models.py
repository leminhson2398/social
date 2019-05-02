from django.db import models
from django.contrib.auth.models import User
from shop.models import Product


class ProductComment(models.Model):
	"""
	related_name on owner field here means product comment
	"""
	owner 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='prpduct_comments')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
	text 	= models.TextField(required=True, db_index=True, blank=False, null=False)
	image 	= models.ImageField(upload_to='commentImages/%Y/%m/%d', null=True, blank=True)
	file 	= models.FileField(upload_to='commentFiles/%Y/%m/%d', null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-created']
		db_table = 'product_comment'

	def __str__(self):
		if len(self.text) > 20:
			return self.text[:20]
		return self.text

	def get_absolute_url(self):
		pass

	def save(self, **kwargs):
		pass


class UserPostComment(models.Model):
	"""
	related_name on owner field here means comments on an user's post
	"""
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='up_comments')
	
