from django.contrib.auth.models import User
import graphene
from graphene_django import DjangoObjectType
from user.forms import SignupForm
from user.models import AppUser
import json
from rest_framework_jwt.serializers import RefreshJSONWebTokenSerializer
from user.utils import CustomJSONWebTokenSerializer
from django.db.models import Q


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude_fields = ('password')


class Query(graphene.AbstractType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    user = graphene.List(UserType, search=graphene.String(required=False))

    def resolve_users(self, info):
        # print(info.context.META['REMOTE_ADDR'])
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
    errors = graphene.String(required=False)
    token = graphene.String(required=False)
    user = graphene.Field(UserType)

    def mutate(self, info, **kwargs):
        ok, errors, token, user = False, None, None, None
        # email, password = [kwargs.get(i, None) for i in ['email', 'password']]
        if not all(list(kwargs.values())):
            errors = "Please provide both your email and password."
        else:
            serializer = CustomJSONWebTokenSerializer(data={
                'email': kwargs.get('email').strip(),
                'password': kwargs.get('password').strip(),
            })
            if serializer.is_valid():
                token = serializer.object['token']
                user = serializer.object['user']
                ok = True
            else:
                print(dir(serializer.errors.values()))
                errors='Your credentials were invalid.'

        return Login(
            ok=ok,
            errors=errors,
            token=token,
            user=user,
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
        ok, user, error = None, None, None
        form = SignupForm(kwargs)
        if form.is_valid():
            ok = True
            user = form.save(info)
        else:
            ok = False
            error = json.dumps(form.errors)

        return CreateAppUser(
            ok=ok,
            error=error,
            user=user,
        )


class ResetPassword(graphene.Mutation):
    ok = graphene.Boolean(required=True)
    error = graphene.String(required=False)

    class Arguments:
        email = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        ok, error = None, None, None

        email = kwargs.get('email', '')
        if email and isinstance(email, str):
            try:
                user = User.objects.get(Q(email=email))
            except User.DoesNotExist:
                ok = False
                error = f"Oops! Found no email {email!r} in our system."
            else:
                ok = True
                # send email
        else:
            ok = False
            error = "Please enter a valid email address."

        return ResetPassword(
            ok=ok,
            error=error
        )


class Mutation(graphene.ObjectType):
    create_user = CreateAppUser.Field()
    login = Login.Field()
    reset_password = ResetPassword.Field()
