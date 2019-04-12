from django.contrib.auth.models import User
import graphene
from graphene_django import DjangoObjectType
from user.forms import SignupForm
from django.core.validators import ValidationError
import json
from user.models import AppUser, UploadImage


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ImageType(DjangoObjectType):
    class Meta:
        model = UploadImage


class Query(graphene.AbstractType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You are not logged in.")
        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username  = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        form = SignupForm(kwargs)
        if form.is_valid():
            return CreateUser(user=form.save())
        else:
            raise Exception(json.dumps(form.errors))


class CreateImage(graphene.Mutation):
    image = graphene.Field(ImageType)

    class Arguments:
        image = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must log in to upload new image.")
        
        rawImageData = kwargs.get('image', '')
        if not rawImageData:
            return
        

  
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
