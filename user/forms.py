from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import ValidationError
# from django.db.models import F
from django.contrib.auth.models import User


class SignupForm(UserCreationForm):
    """
    This form is used for signup new use into system
    extends from UserCreationForm
    """
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def clean_email(self):
        email = self.cleaned_data.get('email', None)
        if not email:
            raise ValidationError("You must provide an email")
        if User.objects.filter(email__iexact=email).count():
            raise ValidationError("Email is alredy taken")
        return email

    def save(self):
        user = super(SignupForm, self).save(commit=False)
        user.is_active = True
        user.save()
        return user
