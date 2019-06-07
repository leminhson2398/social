from django.contrib.auth.models import User
import graphene
from graphene_django import DjangoObjectType
from user.forms import SignupForm
from django.core.validators import ValidationError
from user.models import AppUser
import json
from rest_framework_jwt.serializers import RefreshJSONWebTokenSerializer
# import custom JSONWebTokenSerializer
from user.utils import CustomJSONWebTokenSerializer


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ('password')


class Query(graphene.AbstractType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    user = graphene.List(UserType, search=graphene.String(required=False))

    def resolve_users(self, info):
        # print(info.schema)
        return User.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("You are not logged in.")
        return user

    def resolve_user(self, info, **kwargs):
        search = kwargs.get('search', '')
        if search:
            try:
                users = User.objects.filter(username__icontains=search)
            except User.DoesNotExist:
                raise Exception(
                    f"User with username='{search!r}' does not exist.")
            else:
                return users
        else:
            raise Exception("You must enter an username.")


class Login(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    ok = graphene.Boolean(required=True)
    errors = graphene.List(graphene.String)
    token = graphene.String()
    user = graphene.Field(UserType)

    def mutate(self, info, **kwargs):
        serializer = CustomJSONWebTokenSerializer(data=kwargs)
        if serializer.is_valid():
            token = serializer.object['token']
            user = serializer.object['user']
            return Login(
                ok=True,
                user=user,
                errors=None,
                token=token,
            )
        else:
            return Login(
                ok=False,
                token=None,
                errors=['email', 'Your credentials were invalid.']
            )


class RefreshToken(graphene.Mutation):
    """
    Mutation to reauthenticate a user
    """

    class Arguments:
        token = graphene.String(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()

    def mutate(self, info, token):
        serializer = RefreshJSONWebTokenSerializer(data={"token": token})
        if serializer.is_valid():
            return RefreshToken(
                success=True, token=serializer.object["token"], errors=None
            )
        else:
            return RefreshToken(
                success=False,
                token=None,
                errors=["email", "Unable to login with provided credentials."],
            )


class CreateAppUser(graphene.Mutation):
    ok = graphene.Boolean(required=True)
    user = graphene.Field(UserType, required=False)
    error = graphene.String(required=False)

    class Arguments:
        username = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # utilize UserCreationForm() to create new user
        form = SignupForm(kwargs)
        if form.is_valid():
            return CreateAppUser(ok=True, user=form.save(info))
        else:
            # raise Exception(json.dumps(form.errors))
            return CreateAppUser(ok=False, error=json.dumps(form.errors))


class Mutation(graphene.ObjectType):
    create_user = CreateAppUser.Field()
    # create_avatar = CreateUserAvatar.Field()
    login = Login.Field()
