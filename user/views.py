from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.utils.encoding import force_text, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
# for dataloader
from django.utils.functional import cached_property
from graphene_django.views import GraphQLView
from user.loader import ShopsByUserIdLoader


# Create your views here.
def activate_account(request, uid, token):
    try:
        uid = force_text(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user and default_token_generator.check_token(token):
        user.is_active = True
        user.save()
    return redirect('/')


class GQLContext:
    def __init__(self, request):
        self.request = request

    @cached_property
    def user(self):
        return self.request.user

    @cached_property
    def shops_by_user_id_loader(self):
        return ShopsByUserIdLoader()


class CustomGraphqlView(GraphQLView):
    def get_context(self, request):
        return GQLContext(request)


def test_user_info(request):
    if request.method == 'POST':
        print(request.user)
    else:
        pass