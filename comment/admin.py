from django.contrib import admin

# Register your models here.
from comment.models import ShopComment, ProductComment

admin.site.register(ShopComment)
admin.site.register(ProductComment)
