from django.db import models
from shops.models import Shop

# Create your models here.
class ShopPoint(models.Model):
    shop        = models.OneToOneField(Shop, on_delete=models.CASCADE, related_name='point')
    total_point = models.IntegerField(default=0)

