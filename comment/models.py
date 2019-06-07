from django.db import models
from django.contrib.auth.models import User
from shops.models import Product, Shop
from uuid import uuid4
from django.utils.translation import gettext_lazy
from django.core.exceptions import ValidationError
from comment.utils import Reference


class ProductComment(models.Model):
	"""
	every one can create a comment for a product
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


class ProductReview(models.Model):
	id 		= models.UUIDField(primary_key=True, default=uuid4)
	owner 	= models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='product_reviews')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
	feeling = models.CharField(max_length=10, choices=Reference.user_feeling, default='normal')
	review 	= models.TextField(null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-created']
		db_table = 'product_review'

	def __str__(self):
		return self.owner.username

	def save(self, **kwargs):
		pass


def validate_stars(value):
	if value < 1 or value > 5:
		raise ValidationError(
			gettext_lazy('%(value)d is not a valid number.', params={'value', value})
		)


class ShopComment(models.Model):
	"""
	Users, who purchased product(s) from a shop can comment only,
	to prevent shop inviting somany users are not their customers.
	"""
	id 		= models.UUIDField(primary_key=True, default=uuid4)
	shop 	= models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='comments')
	owner 	= models.ForeignKey(User, on_delete=models.CASCADE, related_name='shop_comments')
	stars 	= models.PositiveSmallIntegerField(validators=[validate_stars])
	text 	= models.TextField(blank=True, null=True)
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

