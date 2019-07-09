from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_file_upload.django import FileUploadGraphQLView
from django.shortcuts import redirect
from django.conf.urls.static import static
from django.conf import settings
# from user.views import CustomGraphqlView


def home(request):
    return redirect('graphql/')


if settings.DEBUG:
    import debug_toolbar

urlpatterns = [
    # for debugging
    path('__debug__', include(debug_toolbar.urls)),
    path('user/', include('user.urls')),
    path('', home),
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True))),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
