from django.contrib import admin

# Register your models here.
from image.models import UserFile, ShopFile

admin.site.register(UserFile)
admin.site.register(ShopFile)
