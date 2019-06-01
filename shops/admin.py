from django.contrib import admin

# Register your models here.
from shops.models import Shop, Category, Product, ImportCountry

admin.site.register(Shop)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ImportCountry)
