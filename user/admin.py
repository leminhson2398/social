from django.contrib import admin

# Register your models here.
from user.models import AppUser

admin.site.register(AppUser)