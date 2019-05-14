from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from graphene_file_upload.django import FileUploadGraphQLView
from django.shortcuts import redirect

from django.conf import settings
from django.urls import include

def home(request):
    return redirect('graphql/')

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__', include(debug_toolbar.urls)),
        path('', home),
        path('admin/', admin.site.urls),
        path('graphql/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True))),
    ]
