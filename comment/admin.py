from django.contrib import admin

# Register your models here.
from comment.models import ShopReview, ProductComment

admin.site.register(ShopReview)
admin.site.register(ProductComment)
