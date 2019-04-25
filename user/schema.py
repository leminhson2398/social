from django.contrib.auth.models import User
import graphene
from graphene_django import DjangoObjectType
from user.forms import SignupForm
from django.core.validators import ValidationError
from user.models import AppUser, AvatarImage
import json
from user import tasks


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ('password')


class ImageType(DjangoObjectType):
    class Meta:
        model = AvatarImage


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


class CreateAppUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # utilize UserCreationForm() to create new user
        form = SignupForm(kwargs)
        if form.is_valid():
            return CreateAppUser(user=form.save())
        else:
            raise Exception(json.dumps(form.errors))


class CreateUserAvatar(graphene.Mutation):
    image = graphene.Field(ImageType)

    class Arguments:
        image = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You must log in to upload new image.")

        rawImageData = kwargs.get('image', '')
        # get byte64 data here, processing it using celery and save to database
        if not rawImageData:
            return

        # call to function in order to process image asynchorously
        image = tasks.process_uploaded_image_data(rawBase64Data=rawImageData, user_id=user.id)
        # print(image.image.url)
        return CreateUserAvatar(
            image=image
        )


class Mutation(graphene.ObjectType):
    create_user = CreateAppUser.Field()
    create_avatar = CreateUserAvatar.Field()
