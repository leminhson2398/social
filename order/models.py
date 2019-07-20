from django.db import models
from django.contrib.auth import get_user_model
from shops.models import Product


# Create your models here.
class Order(models.Model):
    customer        = models.ForeignKey(get_user_model(), on_delete=models.DO_NOTHING, related_name='orders')
    product         = models.ManyToManyField(Product, related_name='orders', db_index=True)
    created         = models.DateTimeField(auto_now_add=True, db_index=True)
    updated         = models.DateTimeField(auto_now=True)
    canceled        = models.BooleanField(default=False)
    cancel_reason   = models.TextField(max_length=500, null=True)

    class Mete:
        ordering = ['-created']

    def __str__(self):
        return self.id

