from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.http.response import JsonResponse

def index(request):
    return JsonResponse(
        {'name': 'Le Minh Son', 'age': '22'}
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('', index, name='index'),
]
