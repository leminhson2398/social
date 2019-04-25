from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class ProductComment(models.Model):
	owner 	= models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='comments')
	text 		= models.TextField(required=True, db_index=True, blank=False, null=False)
	image 	= models.ImageField(upload_to='commentImages/%Y/%m/%d', null=True, blank=True)
	file 		= models.FieldField(upload_to='commentFiles/%Y/%m/%d', null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['-created']

	
