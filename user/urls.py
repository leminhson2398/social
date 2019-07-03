from django.urls import path
from django.conf.urls import url
from user import views

app_name = 'user'

urlpatterns = [
    url(r'^activate/'
        r'(?P<uidb64>[0-9A-Za-z_\-]+)/'
        r'(?P<token>[0-9A-Za-z]{1,13}'
        r'-[0-9A-Za-z]{1,20})/$',
        views.activate_account, name='activate'),
    path('', views.test_user_info, name='user_info'),
]
