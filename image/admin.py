from django.contrib import admin

# Register your models here.
from image.models import UserDocument, ProductDocument, ProductImage, UserImage, Todo

admin.site.register(UserDocument)
admin.site.register(ProductDocument)
admin.site.register(ProductImage)
admin.site.register(UserImage)
admin.site.register(Todo)
